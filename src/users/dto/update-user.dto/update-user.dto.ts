import { PartialType } from '@nestjs/mapped-types';
import { UserType } from '../create-user.dto/create-user.dto';

export class UpdateUserDto extends PartialType(UserType) {}
