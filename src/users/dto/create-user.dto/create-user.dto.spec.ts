import { UserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  it('should be defined', () => {
    expect(new UserDto()).toBeDefined();
  });
});
