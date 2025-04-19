import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({
    description: 'Nombre de la organización',
    example: 'Iglesia Centro de Vida',
  })
  name: string;
}
