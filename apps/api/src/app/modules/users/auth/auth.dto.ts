import { ValidationsConstant } from '@remitano-hometest/shared';
import { Trim } from 'class-sanitizer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserAuthDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(ValidationsConstant.user.passwords.min)
  @MaxLength(ValidationsConstant.user.passwords.max)
  public readonly password: string;
}
