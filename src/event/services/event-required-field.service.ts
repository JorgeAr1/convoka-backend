// src/event/services/event-required-field.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventRequiredFieldDto } from '../dto/create-event-required-field.dto';

@Injectable()
export class EventRequiredFieldService {
/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Creates multiple required fields for an event, skipping any duplicates.
   * @param eventId the ID of the event to associate the fields with
   * @param fields the fields to create
   * @returns the created fields
   */
/*******  7c17d96c-20fe-4392-9d27-798c2462a391  *******/  constructor(private readonly prisma: PrismaService) {}

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
