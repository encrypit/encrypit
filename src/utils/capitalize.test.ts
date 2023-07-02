import { capitalize } from './capitalize';

describe('capitalize', () => {
  it.each([
    ['', ''],
    ['a', 'A'],
    ['hello world', 'Hello world'],
    ['1', '1'],
  ])('capitalizes %p', (input, output) => {
    expect(capitalize(input)).toBe(output);
  });
});
