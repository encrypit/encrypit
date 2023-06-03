import { EXPIRATION } from '../src/constants';
import type { Env } from './types';

/**
 * Gets R2 bucket.
 *
 * @param context - Event context.
 * @param name - Bucket name.
 * @returns - R2 bucket.
 */
export function getBucket(
  context: EventContext<Env, string, unknown>,
  name = EXPIRATION.DAYS_7
): R2Bucket {
  return context.env[name];
}

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
      'Access-Control-Allow-Methods': '*',
    };
  }
  return responseInit;
}
