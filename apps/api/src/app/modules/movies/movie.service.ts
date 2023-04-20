import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieAlreadyExistsError, MovieNotFoundError } from './movie.errors';
import { Result } from '@badrap/result';
import { mongodbErrorCodes } from '../../libs/misc/mongodb.error-codes';
import {
  MovieDocument,
  MovieModel,
  MovieReActionDocument,
  MovieReActionModel,
  MovieReActionEnum,
} from '@remitano-hometest/shared';
import { CreateMovie, Movie } from '@remitano-hometest/types';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(MovieModel.name) private movieModel: Model<MovieDocument>,
    @InjectModel(MovieReActionModel.name)
    private movieReactionModel: Model<MovieReActionDocument>
  ) {}

  async list(): Promise<Result<Movie[]>> {
    const movies = await this.movieModel.find({});
    return Result.ok(movies);
  }

  async save(
    movie: CreateMovie
  ): Promise<Result<string, MovieAlreadyExistsError | Error>> {
    const movieDocument = new this.movieModel(movie);

    try {
      const savedMovie = await movieDocument.save();
      return Result.ok(savedMovie.id);
    } catch (err: any) {
      const movieWithThisTitleAlreadyExists =
        err.code === mongodbErrorCodes.duplicateKey &&
        err.keyPattern?.youtube_video_id;
      if (movieWithThisTitleAlreadyExists) {
        return Result.err(
          new MovieAlreadyExistsError({ youtube_link: movie.youtube_link })
        );
      }
      throw err;
    }
  }

  async delete(id: string): Promise<Result<string, Error>> {
    try {
      const movie = await this.movieModel.deleteOne({ _id: id });
      if (!movie.deletedCount) {
        return Result.err(new MovieNotFoundError({ id }));
      }

      await this.movieReactionModel.deleteOne({ movie_id: id });
      return Result.ok(id);
    } catch (err) {
      return Result.err(err as Error);
    }
  }

  async reaction(
    movie_id: string,
    user_id: string,
    reaction: MovieReActionEnum
  ): Promise<Result<string, Error>> {
    try {
      const movie = await this.movieModel.findById(movie_id);
      if (!movie) {
        return Result.err(new MovieNotFoundError({ id: movie_id }));
      }

      const movieReaction = await this.movieReactionModel.findOneAndUpdate(
        { action_by: user_id, movie_id },
        { reaction },
        { upsert: true, new: true }
      );

      return Result.ok(movieReaction.id);
    } catch (err) {
      return Result.err(err as Error);
    }
  }
}
