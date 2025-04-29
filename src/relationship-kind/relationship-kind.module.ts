import { Module } from '@nestjs/common';
import { RelationshipKindService } from './relationship-kind.service';
import { RelationshipKindController } from './relationship-kind.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RelationshipKindController],
  providers: [RelationshipKindService, PrismaService],
})
export class RelationshipKindModule {}
