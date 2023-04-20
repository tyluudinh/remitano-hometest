import { get } from 'env-var';
import * as dotenv from 'dotenv';
import path = require('path');

// Need this for "nestjs-console" module to get env variables properly
const envPath: string = path.resolve(process.env.PWD as string, '.env');
dotenv.config({ path: envPath });

export class MongodbConfig {
  static readonly username: string = get('MONGODB_USERNAME')
    .required()
    .asString();
  static readonly password: string = get('MONGODB_PASSWORD')
    .required()
    .asString();
  static readonly uri: string = get('MONGODB_URI').required().asString();
  static readonly dbName: string = get('MONGODB_DB_NAME').required().asString();
}
