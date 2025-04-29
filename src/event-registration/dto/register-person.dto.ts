import { IsString, IsOptional, IsEmail, IsDateString } from 'class-validator';

export class RegisterPersonDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @IsString()
  @IsOptional()
  roleId?: string;

  @IsOptional()
  additionalInfo?: Record<string, any>; // Aquí viene shirtSize, etc.

  @IsOptional()
  totalCost?: number;
}
