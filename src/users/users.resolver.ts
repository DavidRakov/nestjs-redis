import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UpdateUserInput, UserInput } from './inputs/users.input';
import { UserDto } from './dto/create-user.dto/create-user.dto';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
@Resolver()
export class UsersResolvers {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserDto])
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Query(() => UserDto)
  async getUser(@Args('id') id: string) {
    try {
      const user = await this.usersService.getUser(id);
      pubsub.publish('usersSearch', { userSearch: 'success' });
      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Mutation(() => UserDto)
  async addUser(@Args('input') input: UserInput) {
    const user = await this.usersService.createUser(input);
    return user;
  }

  @Mutation(() => UserDto)
  async updateUser(@Args('input') input: UpdateUserInput) {
    return await this.usersService.updateUser(input.userId, input.newInput);
  }

  @Mutation(() => String)
  async deleteUser(@Args('id') id: number) {
    await this.usersService.deleteUser(id);
    return 'success';
  }

  @Subscription(() => String)
  userSearch() {
    return pubsub.asyncIterator('usersSearch');
  }
}
