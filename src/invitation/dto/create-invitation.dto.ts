import { IsEmail, IsNotEmpty, IsUUID,IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
export class CreateInvitationDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'uuid-de-organizacion' })
  @IsUUID()
  organizationId: string;

  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @Type(() => Date)
  expiresAt?: Date;
}
