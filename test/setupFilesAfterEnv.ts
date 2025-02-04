// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { resetStore } from './helpers';

// https://github.com/ai/nanoid/issues/363#issuecomment-1458167176
jest.mock('nanoid', () => ({
  customAlphabet: jest.fn(() => jest.fn()),
  nanoid: jest.fn(),
}));

jest.mock('src/config');

afterEach(() => {
  resetStore();
});
