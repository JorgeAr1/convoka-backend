import { IsUUID, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonRelationshipDto {
  @ApiProperty()
  @IsUUID()
  fromPersonId: string;

  @ApiProperty()
  @IsUUID()
  toPersonId: string;

  @ApiProperty()
  @IsUUID()
  relationshipKindId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;
}
