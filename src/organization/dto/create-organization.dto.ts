import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    description: 'Nombre de la organización',
    example: 'Iglesia Centro de Vida',
  })
  @IsString()
  name: string;
}
