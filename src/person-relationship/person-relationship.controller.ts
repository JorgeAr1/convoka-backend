import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PersonRelationshipService } from './person-relationship.service';
import { CreatePersonRelationshipDto } from './dto/create-person-relationship.dto';

@Controller('person-relationships')
export class PersonRelationshipController {
  constructor(private readonly service: PersonRelationshipService) {}

  @Post()
  create(@Body() dto: CreatePersonRelationshipDto) {
    return this.service.create(dto);
  }

  @Get(':personId')
  findForPerson(@Param('personId') personId: string) {
    return this.service.findForPerson(personId);
  }
}
