import { Body, Controller, Get, Post } from '@nestjs/common';
import { RelationshipKindService } from './relationship-kind.service';
import { CreateRelationshipKindDto } from './dto/create-relationship-kind.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Relationship Kind')
@Controller('relationship-kinds')
export class RelationshipKindController {
  constructor(private readonly service: RelationshipKindService) {}

  @Post()
  create(@Body() dto: CreateRelationshipKindDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
