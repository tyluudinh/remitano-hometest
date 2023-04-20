import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from '@remitano-hometest/shared';
import { User } from '@remitano-hometest/types';
import { Model } from 'mongoose';

@Injectable()
export class AuthHelper {
  private readonly jwt: JwtService;

  constructor(
    jwt: JwtService,
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<User> {
    return this.userModel.findById(decoded._id);
  }

  // Generate JWT Token
  public generateToken(user: User): string {
    return this.jwt.sign({ id: user._id, email: user.email });
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  private async validate(token: string): Promise<boolean | never> {
    const decoded: User = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: User = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
