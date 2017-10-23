import { greet } from './index';

describe('index', () => {
  test('greet', () => {
    expect(
      greet('stranger'),
    ).toBe('Welcome, stranger');
  });
});
