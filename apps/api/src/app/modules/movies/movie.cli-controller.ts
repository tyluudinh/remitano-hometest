import { InjectModel } from '@nestjs/mongoose';
import { MovieModel, MovieDocument } from '@remitano-hometest/shared';
import { moviesSeedData } from '@remitano-hometest/types';
import { Model } from 'mongoose';
import { Console, Command } from 'nestjs-console';

@Console()
export class MovieCliController {
  constructor(
    @InjectModel(MovieModel.name) private movieModel: Model<MovieDocument>
  ) {}

  @Command({
    command: 'app:seed-movies',
    description: 'Seed database and indexes with data',
  })
  async seedMovies() {
    console.log('Seeding movies database...');
    const movieModels = moviesSeedData.map(
      (movie) => new this.movieModel(movie)
    );

    await this.movieModel.bulkSave(movieModels);
    console.log(`Seeded ${movieModels.length} items`);
  }
}
