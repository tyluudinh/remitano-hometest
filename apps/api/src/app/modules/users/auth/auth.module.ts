import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '@remitano-hometest/shared';
import { AuthService } from './auth.service';
import { AuthHelper } from './auth.helper';
import { JwtStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '../../../configs/jwt.config';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: JwtConfig.key,
        signOptions: { expiresIn: JwtConfig.expires },
      }),
    }),
  ],
  providers: [AuthService, AuthHelper, JwtStrategy],
  exports: [AuthService, AuthHelper, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
