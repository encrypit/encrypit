import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import { randomUUID } from 'crypto';
global.crypto.randomUUID = randomUUID;

// https://github.com/remix-run/react-router/issues/12363
import { TextEncoder } from 'util';

if (typeof global.TextEncoder !== 'function') {
  global.TextEncoder = TextEncoder as typeof global.TextEncoder;
}
