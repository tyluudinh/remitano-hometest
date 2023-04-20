import { get } from 'env-var';

export class JwtConfig {
  static readonly key: string = get('JWT_KEY')
    .required()
    .asString();
  static readonly expires: string = get('JWT_EXPIRES')
    .required()
    .asString();
}
