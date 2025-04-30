import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PersonRelationshipService } from './person-relationship.service';
import { CreatePersonRelationshipDto } from './dto/create-person-relationship.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Person Relationships')
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
