import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CollectionsConstant } from '../constants/collection.constant';
import { BaseModel } from './base.model';
import { CryptHelper } from '../helpers';

export type UserDocument = UserModel & Document;

@Schema({ collection: CollectionsConstant.users, timestamps: true })
export class UserModel extends BaseModel {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.isModified('password')) {
    user.password = CryptHelper.encodePassword(user.password);
  }
  next();
});
