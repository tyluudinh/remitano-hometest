import * as bcrypt from 'bcryptjs';

export class CryptHelper {
  // Validate User's password
  public static isPasswordValid(
    password: string,
    userPassword: string
  ): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public static encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }
}
