import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsBoolean, IsNumber, IsOptional, Min, ValidateNested, IsObject, IsString, IsEmail, IsDateString } from 'class-validator';
import { CreateRelatedPersonDto } from './create-related-person.dto';

export class CreateEventRegistrationDto {
  @ApiProperty({ description: 'ID del evento al que se registra' })
  @IsUUID()
  eventId: string;

  @ApiPropertyOptional({ description: 'ID de la persona ya existente' })
  @IsUUID()
  @IsOptional()
  personId?: string;

  // Datos para crear una nueva persona si no existe
  @ApiPropertyOptional({ description: 'Nombre de la persona' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Apellido de la persona' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ description: 'Correo electrónico de la persona' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Teléfono de la persona' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: 'Fecha de nacimiento de la persona' })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  gender?: 'MASCULINO' | 'FEMENINO' | 'SIN_ESPECIFICAR';

  @ApiPropertyOptional({ description: 'ID del rol del participante (opcional)' })
  @IsUUID()
  @IsOptional()
  roleId?: string;

  @ApiPropertyOptional({ description: 'Indica si ya ha pagado' })
  @IsBoolean()
  @IsOptional()
  hasPaid?: boolean = false;

  @ApiPropertyOptional({ description: 'Cantidad que ha pagado' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  amountPaid?: number = 0;

  @ApiPropertyOptional({ description: 'Costo total del evento para esta persona' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  totalCost?: number;

  @ApiPropertyOptional({ description: 'Información adicional personalizada para este registro de evento', type: Object })
  @IsOptional()
  @IsObject()
  additionalInfo?: Record<string, any>;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateRelatedPersonDto)
  relatedPersons?: CreateRelatedPersonDto[];
}
