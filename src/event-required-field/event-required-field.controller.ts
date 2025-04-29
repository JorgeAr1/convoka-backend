import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { EventRequiredFieldService } from './event-required-field.service';
import { CreateEventRequiredFieldDto } from './dto/create-event-required-field.dto';

@Controller('events/:eventId/required-fields')
export class EventRequiredFieldController {
  constructor(private readonly eventRequiredFieldService: EventRequiredFieldService) {}

  @Post()
  async createMany(
    @Param('eventId') eventId: string,
    @Body() fields: CreateEventRequiredFieldDto[],
  ) {
    return this.eventRequiredFieldService.createMany(eventId, fields);
  }

  @Get()
  async findByEvent(@Param('eventId') eventId: string) {
    return this.eventRequiredFieldService.findByEvent(eventId);
  }
}
