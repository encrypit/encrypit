/// <reference types="@cloudflare/workers-types" />
/// <reference types="@types/jest" />
import { getResponseInit } from './utils';

describe('getResponseInit', () => {
  it.each(['development', 'preview', 'production'] as const)(
    'returns response object for environment %p',
    (environment) => {
      expect(getResponseInit(environment)).toMatchSnapshot();
    },
  );
});
