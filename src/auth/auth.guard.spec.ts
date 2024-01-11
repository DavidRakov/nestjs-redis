import { BeltGuard } from './auth.guard';

describe('BeltGuard', () => {
  it('should be defined', () => {
    expect(new BeltGuard()).toBeDefined();
  });
});
