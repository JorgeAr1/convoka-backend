import { IsEmail, IsNotEmpty, IsUUID,IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
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
}
