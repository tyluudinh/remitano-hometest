import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseModel } from './base.model';
import { CollectionsConstant } from '../constants';
import { MovieReActionEnum } from '../enums';

export type MovieReActionDocument = MovieReActionModel & Document;

@Schema({ collection: CollectionsConstant.movie_reactions, timestamps: true })
export class MovieReActionModel extends BaseModel {
  @Prop({
    type: String,
    enum: MovieReActionEnum,
    default: MovieReActionEnum.Like,
  })
  reaction: string;

  @Prop({ type: String, ref: CollectionsConstant.users })
  action_by: string;

  @Prop({ type: String, ref: CollectionsConstant.movies })
  movie_id: string;
}

export const MovieReActionSchema =
  SchemaFactory.createForClass(MovieReActionModel);
