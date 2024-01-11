import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Name {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

@ObjectType()
export class UserType {
  @Field(() => ID)
  _id: string;

  @Field()
  name: Name;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  isAdmin: boolean;
}
