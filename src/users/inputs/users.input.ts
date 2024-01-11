import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  Matches,
  MinLength,
} from 'class-validator';

@InputType()
export class NameInput {
  @IsNotEmpty()
  @MinLength(2)
  @Field()
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @Field()
  lastName: string;
}

@InputType()
export class NewUserInput {
  @IsNotEmptyObject()
  @Field()
  name: NameInput;

  @IsNotEmpty()
  @Matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, {
    message: 'Invalid email address format',
  })
  @Field()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,20})/, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.',
  })
  @Field()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field()
  isAdmin: boolean;
}

@InputType()
export class UpdateUserDetailsInput {
  @IsNotEmptyObject()
  @Field()
  name: NameInput;

  @IsNotEmpty()
  @Matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, {
    message: 'Invalid email address format',
  })
  @Field()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,20})/, {
    message:
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.',
  })
  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @IsNotEmpty()
  @Field()
  userId: string;

  @IsNotEmpty()
  @Field()
  newDetailsInput: UpdateUserDetailsInput;
}
