import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto';
import { UpdateEventRegistrationDto } from './dto/update-event-registration.dto';

function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

@Injectable()
export class EventRegistrationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventRegistrationDto) {
    let personId = dto.personId;

    // Buscar o crear persona principal
    if (!personId) {
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
        const newPerson = await this.prisma.person.create({
          data: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email?.toLowerCase(),
            phone: dto.phone,
            gender: dto.gender,
            birthdate: dto.birthDate ? new Date(dto.birthDate) : new Date('2000-01-01'),
          },
        });
        personId = newPerson.id;
      }
    }

    if (!personId) {
      throw new BadRequestException('Debe especificar un ID de persona o información para crearla');
    }

    // Crear personas relacionadas si se incluyeron
    if (dto.relatedPersons?.length > 0) {
      for (const rel of dto.relatedPersons) {
        let relatedPersonId = rel.relatedPersonId;

        if (!relatedPersonId) {
          const created = await this.prisma.person.create({
            data: {
              firstName: rel.firstName!,
              lastName: rel.lastName!,
              birthdate: new Date(rel.birthDate!),
              email: rel.email?.toLowerCase(),
              phone: rel.phone,
              gender: rel.gender,
            },
          });
          relatedPersonId = created.id;
        }

        await this.prisma.personRelationship.create({
          data: {
            fromPersonId: personId,
            toPersonId: relatedPersonId,
            relationshipKindId: rel.relationshipKindId,
            note: rel.note,
          },
        });
      }
    }

    // Validación: si es menor de edad y se requieren relaciones familiares
    const person = await this.prisma.person.findUnique({
      where: { id: personId },
    });

    if (!person) {
      throw new NotFoundException('La persona no fue encontrada');
    }

    const age = calculateAge(person.birthdate);
    if (age < 18) {
      const requiredRelationships = await this.prisma.eventRequiredRelationship.findMany({
        where: {
          eventId: dto.eventId,
          appliesToMinors: true,
        },
      });

      for (const requirement of requiredRelationships) {
        const hasRelation = await this.prisma.personRelationship.findFirst({
          where: {
            fromPersonId: personId,
            relationshipKindId: requirement.requiredKindId,
          },
        });

        if (!hasRelation) {
          const kind = await this.prisma.relationshipKind.findUnique({
            where: { id: requirement.requiredKindId },
          });

          throw new BadRequestException(
            `Este evento requiere al menos una relación del tipo "${kind?.name}" para personas menores de edad.`
          );
        }
      }
    }

    // Crear registro en el evento
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
