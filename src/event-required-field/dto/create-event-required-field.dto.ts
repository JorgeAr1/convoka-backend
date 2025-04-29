import { IsBoolean, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateEventRequiredFieldDto {
  @IsString()
  fieldName: string;

  @IsString()
  fieldLabel: string;

  @IsBoolean()
  @IsOptional()
  isCustom?: boolean = false;

  @IsString()
  @IsOptional()
  fieldType?: string; // Ej: 'text', 'number', 'date', 'select', etc.

  @IsArray()
  @IsOptional()
  options?: string[];

  @IsBoolean()
  @IsOptional()
  isRequired?: boolean = true;
}
