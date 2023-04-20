import { InjectModel } from '@nestjs/mongoose';
import { UserModel, UserDocument } from '@remitano-hometest/shared';
import { userSeedData } from '@remitano-hometest/types';
import { Model } from 'mongoose';
import { Console, Command } from 'nestjs-console';

@Console()
export class UserCliController {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  @Command({
    command: 'app:seed-users',
    description: 'Seed database and indexes with data',
  })
  async seedUsers() {
    console.log('Seeding users database...');
    const userModels = userSeedData.map((user) => new this.userModel(user));

    await this.userModel.bulkSave(userModels);
    console.log(`Seeded ${userModels.length} items`);
  }
}
