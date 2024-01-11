import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class Name {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

@Schema()
export class User {
  @Prop()
  name: Name;

  @Prop()
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
