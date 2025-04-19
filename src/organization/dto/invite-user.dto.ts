import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from '@prisma/client';
// import { ApiProperty } from '@nestjs/swagger';

export class InviteUserDto {
  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;
}
