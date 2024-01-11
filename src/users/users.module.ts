import { Module } from '@nestjs/common';
import { UsersResolvers } from './users.resolver';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function () {
            console.log('Hello from pre save');
          });
          schema.pre('findOneAndUpdate', () => {
            console.log('update successfully');
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [UsersService, UsersResolvers],
})
export class UsersModule {}
