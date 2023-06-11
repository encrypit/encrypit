import { EXPIRATION } from 'shared/constants';
import type { CustomMetadata } from 'shared/types';

import type { Context, Env } from './types';

/**
 * Gets R2 bucket.
 *
 * @param context - Event context.
 * @param expirationDays - Expiration days.
 * @returns - R2 bucket.
 */
export function getBucket(
  context: Context,
  expirationDays = EXPIRATION.DAYS_7
): R2Bucket {
  switch (expirationDays) {
    case EXPIRATION.DAYS_7:
    default:
      return context.env.EXPIRATION_DAYS_7;
  }
}

/**
 * Gets object custom metadata.
 *
 * @param context - R2 object.
 * @returns - Custom metadata.
 */
export function getCustomMetadata(obj: R2ObjectBody) {
  return obj.customMetadata as unknown as CustomMetadata;
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
