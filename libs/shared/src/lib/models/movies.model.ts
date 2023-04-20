import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseModel } from './base.model';
import { CollectionsConstant, ValidationsConstant } from '../constants';
import { getYoutubeVideoId } from '../utils';

export type MovieDocument = MovieModel & Document;

@Schema({ collection: CollectionsConstant.movies, timestamps: true })
export class MovieModel extends BaseModel {
  @Prop()
  youtube_link: string;

  @Prop({ unique: true })
  youtube_video_id: string;

  @Prop({ type: String, ...ValidationsConstant.movie.title })
  title: string;

  @Prop({ type: String, ...ValidationsConstant.movie.description })
  description: string;

  @Prop({ type: String, ref: CollectionsConstant.users })
  shared_by: string;
}

export const MovieSchema = SchemaFactory.createForClass(MovieModel);

MovieSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const movie = this;
  if (movie.isModified('youtube_link')) {
    movie.youtube_video_id = getYoutubeVideoId(movie.youtube_link);
  }
  next();
});
