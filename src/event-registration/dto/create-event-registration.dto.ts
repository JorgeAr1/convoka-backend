import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsBoolean,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateEventRegistrationDto {
  @ApiProperty({ description: 'ID de la persona que se registra' })
  @IsUUID()
  personId: string;

  @ApiProperty({ description: 'ID del evento al que se registra' })
  @IsUUID()
  eventId: string;

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
}
