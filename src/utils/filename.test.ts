import { generateFileName } from './filename';

describe('generateFileName', () => {
  const date = new Date('2020-04-20');

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(date);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('generates filename with extension', () => {
    expect(generateFileName()).toBe('encrypit-download-20200420T000000.zip');
  });
});
