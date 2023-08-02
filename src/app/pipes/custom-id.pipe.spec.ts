import { CustomIdPipe } from './custom-id.pipe';

describe('CustomIdPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomIdPipe();
    expect(pipe).toBeTruthy();
  });
});
