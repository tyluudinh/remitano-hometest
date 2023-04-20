import { Prop } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseModel {
  @Prop()
  @Expose()
  createdAt: Date;

  @Prop()
  @Expose()
  updatedAt: Date;

  @Prop({ default: uuidv4, _id: true })
  _id: string;
}
