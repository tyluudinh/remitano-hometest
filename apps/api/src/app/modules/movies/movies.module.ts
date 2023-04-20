import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MovieModel,
  MovieReActionModel,
  MovieReActionSchema,
  MovieSchema,
} from '@remitano-hometest/shared';
import { MovieCliController } from './movie.cli-controller';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MovieModel.name, schema: MovieSchema },
      { name: MovieReActionModel.name, schema: MovieReActionSchema },
    ]),
  ],
  providers: [MovieCliController, MovieService],
  controllers: [MovieController],
})
export class MoviesModule {}
