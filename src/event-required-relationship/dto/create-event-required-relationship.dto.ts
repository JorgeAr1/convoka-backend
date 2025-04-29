import { IsUUID, IsBoolean, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventRequiredRelationshipDto {
  @ApiProperty({ example: 'event-id' })
  @IsUUID()
  eventId: string;

  @ApiProperty({ example: 'kind-id' })
  @IsUUID()
  requiredKindId: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  appliesToMinors?: boolean = true;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  appliesToAll?: boolean = false;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @IsOptional()
  requiredCount?: number = 1;
}
