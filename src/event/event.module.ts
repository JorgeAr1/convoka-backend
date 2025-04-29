
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventRequiredFieldService } from './services/event-required-field.service';
import { EventRequiredFieldController } from './controllers/event-required-field.controller';


@Module({
  controllers: [EventController,EventRequiredFieldController],
  providers: [EventService,EventRequiredFieldService, PrismaService ],
})
export class EventModule {}

