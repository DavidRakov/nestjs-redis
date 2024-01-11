import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from '../create-user.dto/create-user.dto';

export class UpdateUserDto extends PartialType(UserDto) {}
