import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto';
import { UpdateEventRegistrationDto } from './dto/update-event-registration.dto';

@Injectable()
export class EventRegistrationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventRegistrationDto) {
    let personId = dto.personId;

    if (!personId) {
      // Buscar persona por email o teléfono
      const existingPerson = await this.prisma.person.findFirst({
        where: {
          OR: [
            { email: dto.email?.toLowerCase() },
            { phone: dto.phone },
          ],
        },
      });

      if (existingPerson) {
        personId = existingPerson.id;
      } else {
        // Crear persona nueva
        const newPerson = await this.prisma.person.create({
          data: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email?.toLowerCase(),
            phone: dto.phone,
            gender: undefined,
            birthdate: dto.birthDate ? new Date(dto.birthDate) : new Date('2000-01-01'), // Valor predeterminado
          },
        });
        personId = newPerson.id;
      }
    }

    if (!personId) {
      throw new BadRequestException('Debe especificar un ID de persona o información para crearla');
    }

    return this.prisma.eventRegistration.create({
      data: {
        eventId: dto.eventId,
        personId,
        roleId: dto.roleId,
        hasPaid: dto.hasPaid ?? false,
        amountPaid: dto.amountPaid ?? 0,
        totalCost: dto.totalCost,
        additionalInfo: dto.additionalInfo,
      },
      include: {
        person: true,
        event: true,
        role: true,
      },
    });
  }

  async findAll(filters: { eventId?: string; personId?: string }) {
    const { eventId, personId } = filters;

    return this.prisma.eventRegistration.findMany({
      where: {
        eventId: eventId || undefined,
        personId: personId || undefined,
      },
      include: {
        person: true,
        event: true,
        role: true,
      },
    });
  }

  async findOne(id: string) {
    const registration = await this.prisma.eventRegistration.findUnique({
      where: { id },
      include: {
        person: true,
        event: true,
        role: true,
      },
    });

    if (!registration) {
      throw new NotFoundException('Registro de evento no encontrado');
    }

    return registration;
  }

  async update(id: string, updateDto: UpdateEventRegistrationDto) {
    return this.prisma.eventRegistration.update({
      where: { id },
      data: {
        ...updateDto,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.eventRegistration.delete({
      where: { id },
    });
  }
}
