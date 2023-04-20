import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthHelper } from './auth.helper';
import { UserAuthDto } from './auth.dto';
import { User } from '@remitano-hometest/types';
import { InjectModel } from '@nestjs/mongoose';
import {
  CryptHelper,
  UserDocument,
  UserModel,
} from '@remitano-hometest/shared';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    @Inject(AuthHelper) private readonly helper: AuthHelper
  ) {}

  public async auth(body: UserAuthDto): Promise<User | never> {
    const { email, password }: UserAuthDto = body;
    const user: User = await this.userModel.findOne({ email });

    if (user) {
      const isPasswordValid: boolean = CryptHelper.isPasswordValid(
        password,
        user.password
      );
      if (!isPasswordValid) {
        throw new HttpException('No user found', HttpStatus.NOT_FOUND);
      }

      return user;
    }

    const newUser = await new this.userModel(body).save();

    return newUser;
  }

  public async refresh(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }
}
