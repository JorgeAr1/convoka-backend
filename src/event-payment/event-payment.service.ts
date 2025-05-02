import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventPaymentDto } from './dto/create-event-payment.dto';

@Injectable()
export class EventPaymentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEventPaymentDto, userId: string) {
    return this.prisma.eventPayment.create({
      data: {
        ...dto,
        registeredById: userId,
      },
    });
  }

  async findByEventRegistration(eventRegistrationId: string) {
    return this.prisma.eventPayment.findMany({
      where: { eventRegistrationId },
      orderBy: { createdAt: 'desc' },
      include: {
        registeredBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
