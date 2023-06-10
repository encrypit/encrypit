import { generateFileName } from './filename';

describe('generateFileName', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-04-20'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('generates filename with extension', () => {
    expect(generateFileName()).toBe('encrypit-download-20200420T000000.zip');
  });
});
