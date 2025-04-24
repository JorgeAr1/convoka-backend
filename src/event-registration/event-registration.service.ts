import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventRegistrationDto } from './dto/create-event-registration.dto';
import { UpdateEventRegistrationDto } from './dto/update-event-registration.dto';

@Injectable()
export class EventRegistrationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateEventRegistrationDto) {
    return this.prisma.eventRegistration.create({
      data: {
        ...createDto,
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
