import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Param,
  } from '@nestjs/common';
  import { EventPaymentService } from './event-payment.service';
  import { CreateEventPaymentDto } from './dto/create-event-payment.dto';
  import { JwtAuthGuard } from 'src/auth/guards/user/jwt-auth.guard';
  import { CurrentUser } from 'src/common/decorators/current-user.decorator';
  import { User } from '@prisma/client';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Event Payments')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Controller('event-payments')
  export class EventPaymentController {
    constructor(private readonly service: EventPaymentService) {}
  
    @Post()
    async create(
      @Body() dto: CreateEventPaymentDto,
      @CurrentUser() user: User,
    ) {
      return this.service.create(dto, user.id);
    }
  
    @Get(':eventRegistrationId')
    async findByEventRegistration(@Param('eventRegistrationId') id: string) {
      return this.service.findByEventRegistration(id);
    }
  }
  