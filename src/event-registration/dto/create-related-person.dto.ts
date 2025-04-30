import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRelatedPersonDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  relatedPersonId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  birthDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  gender?: 'MASCULINO' | 'FEMENINO' | 'SIN_ESPECIFICAR';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @IsUUID()
  relationshipKindId: string;

  @IsOptional()
  @IsString()
  note?: string;
}
