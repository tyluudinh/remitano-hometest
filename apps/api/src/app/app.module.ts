import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbConfig } from './configs/mongodb.config';
import { ConsoleModule } from 'nestjs-console';
import { MoviesModule } from './modules/movies/movies.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MongodbConfig.uri, {
      user: MongodbConfig.username,
      pass: MongodbConfig.password,
      dbName: MongodbConfig.dbName,
    }),
    ConsoleModule,
    MoviesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
