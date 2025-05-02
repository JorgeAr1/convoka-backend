import { Module } from '@nestjs/common';
import { EventPaymentService } from './event-payment.service';
import { EventPaymentController } from './event-payment.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EventPaymentController],
  providers: [EventPaymentService, PrismaService],
})
export class EventPaymentModule {}
