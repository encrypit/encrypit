import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import { randomUUID } from 'crypto';
global.crypto.randomUUID = randomUUID;

// https://github.com/remix-run/react-router/issues/12363
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
