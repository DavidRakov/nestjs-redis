import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { NewUserInput } from './inputs/users.input';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { RedisJSON } from '@redis/json/dist/commands';
import { RedisClientType } from 'redis';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @Inject('REDIS_CLIENT') private redis: RedisClientType,
  ) {}

  async checkKey(key: string) {
    return await this.redis.exists(key);
  }

  // async addUsersToCache(){
  //   try {
  //     const usersMDB=await
  //     if (!usersMDB.length) throw new NotFoundException('no any users');

  //   } catch (error) {
  //     return Promise.reject(error);

  //   }
  // }

  async getUsers() {
    try {
      const users = await this.redis.json.get('users', { path: '.' });
      if (!users) {
        try {
          const usersMDB = await this.userModel.find({});
          if (!usersMDB.length) throw new NotFoundException('no any users');
          await this.redis.json.set(
            'users',
            '.',
            usersMDB as unknown as RedisJSON,
          );
          return await this.redis.json.get('users', { path: '.' });
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return users;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getUser(id: string) {
    try {
      const user = await this.redis.json.get('users', {
        path: `$..[?(@._id=="${id}")]`,
      });
      console.log(user);

      return user[0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createUser(userFromClient: NewUserInput) {
    try {
      const user = new this.userModel(userFromClient);
      await user.save();
      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // async updateUser(userId: number, userDetails: UpdateUserDto) {
  //   const updatedUser = await this.userModel.findOneAndUpdate(
  //     { userId },
  //     userDetails,
  //     { returnDocument: 'after' },
  //   );
  //   return updatedUser;
  // }

  async deleteUser(userId: number) {
    return await this.userModel.findOneAndDelete({ userId });
  }
}
