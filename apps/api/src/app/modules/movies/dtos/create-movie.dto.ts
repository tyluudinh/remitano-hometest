import { CreateMovie } from '@remitano-hometest/types';
import { validYoutubeLinkPattern } from '@remitano-hometest/shared';
import {
  IsString,
  MaxLength,
  MinLength,
  IsArray,
  Matches,
} from 'class-validator';
import { Trim, Escape } from 'class-sanitizer';
import { ApiProperty } from '@nestjs/swagger';
import { ValidationsConstant } from '@remitano-hometest/shared';

export class CreateMovieDto implements CreateMovie {
  @ApiProperty({
    description: 'Movie title',
  })
  @MaxLength(ValidationsConstant.movie.title.max)
  @MinLength(ValidationsConstant.movie.title.min)
  @IsString()
  @Trim()
  @Escape()
  readonly title: string;

  @ApiProperty({
    description: 'Movie description',
  })
  @MaxLength(ValidationsConstant.movie.description.max)
  @MinLength(ValidationsConstant.movie.description.min)
  @IsString()
  @Trim()
  @Escape()
  readonly description: string;

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=ENmxCaSV59E',
    description: 'Youtube video link',
  })
  @MaxLength(1000, { each: true })
  @MinLength(2, { each: true })
  @Matches(validYoutubeLinkPattern, {
    message: 'Url must be a valid youtube video link',
    each: true,
  })
  readonly youtube_link: string;
}
