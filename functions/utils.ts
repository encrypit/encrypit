import type { Env } from './types';

/**
 * Generates response init.
 *
 * @param environment - Node environment.
 * @returns - Response init.
 */
export function getResponseInit(environment: Env['NODE_ENV']) {
  const responseInit: ResponseInit = {};
  if (environment === 'development') {
    responseInit.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    };
  }
  return responseInit;
}
