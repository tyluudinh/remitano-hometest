import { ApiProperty } from '@nestjs/swagger';
import { Uuid } from '@remitano-hometest/types';
import { IsUUID } from 'class-validator';

export class UuidDto implements Uuid {
  @ApiProperty({
    example: '4136cd0b-d90b-4af7-b485-5d1ded8db252',
  })
  @IsUUID()
  readonly uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}
