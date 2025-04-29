import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePersonRelationshipDto } from './dto/create-person-relationship.dto';

@Injectable()
export class PersonRelationshipService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePersonRelationshipDto) {
    const { fromPersonId, toPersonId, relationshipKindId, note } = dto;
  
    // Crear la relación principal
    const relationship = await this.prisma.personRelationship.create({
      data: {
        fromPersonId,
        toPersonId,
        relationshipKindId,
        note,
      },
    });
  
    // Buscar tipo de relación para saber si tiene inverso
    const kind = await this.prisma.relationshipKind.findUnique({
      where: { id: relationshipKindId },
    });
  
    if (kind?.inverseKindId) {
      // Verificar si ya existe la relación inversa
      const existingInverse = await this.prisma.personRelationship.findFirst({
        where: {
          fromPersonId: toPersonId,
          toPersonId: fromPersonId,
          relationshipKindId: kind.inverseKindId,
        },
      });
  
      if (!existingInverse) {
        await this.prisma.personRelationship.create({
          data: {
            fromPersonId: toPersonId,
            toPersonId: fromPersonId,
            relationshipKindId: kind.inverseKindId,
            note: `Relación generada automáticamente como inversa de ${kind.name}`,
          },
        });
      }
    }
  
    return relationship;
  }  

  async findForPerson(personId: string) {
    return this.prisma.personRelationship.findMany({
      where: {
        OR: [
          { fromPersonId: personId },
          { toPersonId: personId },
        ],
      },
      include: {
        fromPerson: true,
        toPerson: true,
        relationshipKind: true,
      },
    });
  }
}
