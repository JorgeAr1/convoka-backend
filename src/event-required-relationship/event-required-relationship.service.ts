import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventRequiredRelationshipDto } from './dto/create-event-required-relationship.dto';

@Injectable()
export class EventRequiredRelationshipService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventRequiredRelationshipDto) {
    return this.prisma.eventRequiredRelationship.create({
      data: {
        eventId: dto.eventId,
        requiredKindId: dto.requiredKindId,
        appliesToMinors: dto.appliesToMinors ?? true,
        appliesToAll: dto.appliesToAll ?? false,
        requiredCount: dto.requiredCount ?? 1,
      },
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.eventRequiredRelationship.findMany({
      where: { eventId },
      include: { relationshipKind: true },
    });
  }
}
