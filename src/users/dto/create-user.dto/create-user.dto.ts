import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  _id: string;

  @Field()
  readonly userId: number;

  @Field()
  @MinLength(4)
  readonly name: string;

  @Field()
  @IsEmail()
  readonly email: string;
}
