import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '@remitano-hometest/shared';
import { UserCliController } from './user.cli-controller';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  providers: [UserCliController],
})
export class UsersModule {}
