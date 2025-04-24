import { IsString, IsOptional, IsDateString, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateEventDto {
  @ApiProperty({ example: 'Conferencia anual' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Evento de networking y tecnología' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-06-01T10:00:00Z' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-06-01T12:00:00Z' })
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @ValidateIf((o) => !o.locationDescription)
  locationId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @ValidateIf((o) => !o.locationId)
  locationDescription?: string;

  @ApiProperty({ example: 'org_123' })
  @IsString()
  organizationId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @ValidateIf((o) => !o.locationId)
  locationAddress?: string;
}