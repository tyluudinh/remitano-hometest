import {
  Body,
  ConflictException,
  Controller,
  Post,
  HttpStatus,
  Delete,
  NotFoundException,
  Param,
  Get,
} from '@nestjs/common';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { MovieAlreadyExistsError, MovieNotFoundError } from './movie.errors';
import { MovieService } from './movie.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { swagger } from '../../libs/misc/swagger.definitions';
import { ErrorResponseDto } from '../../libs/dto/error.response.dto';
import { UuidDto } from '../../libs/dto/uuid.response.dto';
import { MovieModel } from '@remitano-hometest/shared';
import { Movie } from '@remitano-hometest/types';

@Controller('/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'List movies' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MovieModel,
  })
  @Get()
  async list(): Promise<Movie[]> {
    const result = await this.movieService.list();
    return result.unwrap((movies) => movies);
  }

  @ApiOperation({ summary: 'Create a movie' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UuidDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: MovieAlreadyExistsError.message,
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<UuidDto> {
    const result = await this.movieService.save(createMovieDto);
    return result.unwrap(
      (id) => new UuidDto(id),
      (error) => {
        if (error instanceof MovieAlreadyExistsError)
          throw new ConflictException(error.unwrap());
        throw error;
      }
    );
  }

  @ApiOperation({ summary: 'Delete a movie' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: ErrorResponseDto,
  })
  @Delete('/:uuid')
  async delete(@Param() { uuid }: UuidDto): Promise<void> {
    console.log(uuid);
    const result = await this.movieService.delete(uuid);
    return result.unwrap(
      () => {
        return;
      },
      (error) => {
        if (error instanceof MovieNotFoundError)
          throw new NotFoundException(error.unwrap());
        throw error;
      }
    );
  }
}
