import { Module } from '@nestjs/common';
import { PersonRelationshipService } from './person-relationship.service';
import { PersonRelationshipController } from './person-relationship.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PersonRelationshipController],
  providers: [PersonRelationshipService, PrismaService],
})
export class PersonRelationshipModule {}
