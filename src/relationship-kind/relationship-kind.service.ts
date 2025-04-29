import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRelationshipKindDto } from './dto/create-relationship-kind.dto';

@Injectable()
export class RelationshipKindService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRelationshipKindDto) {
    return this.prisma.relationshipKind.create({
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async findAll() {
    return this.prisma.relationshipKind.findMany();
  }
}
