import { Module } from '@nestjs/common';
import { EventRequiredRelationshipService } from './event-required-relationship.service';
import { EventRequiredRelationshipController } from './event-required-relationship.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EventRequiredRelationshipController],
  providers: [EventRequiredRelationshipService, PrismaService],
  exports: [EventRequiredRelationshipService],
})
export class EventRequiredRelationshipModule {}
