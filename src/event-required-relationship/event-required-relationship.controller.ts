import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EventRequiredRelationshipService } from './event-required-relationship.service';
import { CreateEventRequiredRelationshipDto } from './dto/create-event-required-relationship.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Event Required Relationship')
@Controller('events/:eventId/required-relationships')
export class EventRequiredRelationshipController {
  constructor(private readonly service: EventRequiredRelationshipService) {}

  @Post()
  async create(
    @Param('eventId') eventId: string,
    @Body() dto: CreateEventRequiredRelationshipDto,
  ) {
    return this.service.create({ ...dto, eventId });
  }

  @Get()
  async findByEvent(@Param('eventId') eventId: string) {
    return this.service.findByEvent(eventId);
  }
}
