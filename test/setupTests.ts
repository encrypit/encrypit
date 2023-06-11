// https://github.com/ai/nanoid/issues/363#issuecomment-1458167176
jest.mock('nanoid', () => ({
  customAlphabet: jest.fn(() => jest.fn()),
  nanoid: jest.fn(),
}));

jest.mock('src/config');

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import { randomUUID } from 'crypto';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.crypto.randomUUID = randomUUID;

import { TextEncoder } from 'util';
window.TextEncoder = TextEncoder;

import { resetStore } from './helpers';

afterEach(() => {
  resetStore();
});
