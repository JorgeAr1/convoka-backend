import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventRequiredFieldDto } from './dto/create-event-required-field.dto';

@Injectable()
export class EventRequiredFieldService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(eventId: string, fields: CreateEventRequiredFieldDto[]) {
    const data = fields.map((field) => ({
      eventId,
      fieldName: field.fieldName,
      fieldLabel: field.fieldLabel,
      isCustom: field.isCustom ?? false,
      fieldType: field.fieldType,
      options: field.options ? JSON.stringify(field.options) : undefined,
      isRequired: field.isRequired ?? true,
    }));

    return this.prisma.eventRequiredField.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.eventRequiredField.findMany({
      where: { eventId },
    });
  }
}
