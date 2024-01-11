import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  readonly userId: number;
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
}

@InputType()
export class Input {
  @Field()
  readonly name: string;
  @Field()
  readonly email: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  readonly userId: number;
  @Field()
  readonly newInput: Input;
}
