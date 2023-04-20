import { UserAuth } from '@remitano-hometest/types';
import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserAuthDto implements UserAuth {
  @ApiProperty({
    description: 'Email address',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Password',
  })
  @MaxLength(30)
  @MinLength(6)
  @IsString()
  readonly password: string;
}
