import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  import { EventRegistrationService } from './event-registration.service';
  import { CreateEventRegistrationDto } from './dto/create-event-registration.dto';
  import { UpdateEventRegistrationDto } from './dto/update-event-registration.dto';
  import { Query } from '@nestjs/common';
  
  @ApiTags('Participants Registry')
  @Controller('event-registrations')
  export class EventRegistrationController {
    constructor(private readonly eventRegistrationService: EventRegistrationService) {}
  
    @Post()
    @ApiOperation({ summary: 'Registrar participante a un evento' })
    @ApiResponse({ status: 201, description: 'Registro creado correctamente' })
    create(@Body() dto: CreateEventRegistrationDto) {
      return this.eventRegistrationService.create(dto);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Obtener un registro por ID' })
    findOne(@Param('id') id: string) {
      return this.eventRegistrationService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un registro existente' })
    update(@Param('id') id: string, @Body() dto: UpdateEventRegistrationDto) {
      return this.eventRegistrationService.update(id, dto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar un registro' })
    remove(@Param('id') id: string) {
      return this.eventRegistrationService.remove(id);
    }

    @Get()
    @ApiOperation({ summary: 'Listar registros de participantes (opcionalmente por evento o persona)' })
    findAll(
    @Query('eventId') eventId?: string,
    @Query('personId') personId?: string,
    ) {
    return this.eventRegistrationService.findAll({ eventId, personId });
    }
  }
  