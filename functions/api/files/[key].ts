import { FORBIDDEN, NOT_FOUND } from 'costatus';
import type { Env } from 'functions/types';
import { getBucket, getCustomMetadata, getResponseInit } from 'functions/utils';
import { EXPIRATION, HEADERS } from 'shared/constants';

type Params = 'key';

/**
 * GET /api/files/[key]
 *
 * @param context - Context.
 * @returns - Response.
 */
export const onRequestGet: PagesFunction<Env, Params> = async (context) => {
  let body: BodyInit = null;
  const init = getResponseInit(context.env.NODE_ENV);

  const fileKey = context.params.key as string;
  const bucket = getBucket(context);
  const obj = await bucket.get(fileKey);

  if (!obj) {
    init.status = NOT_FOUND;
    return new Response(body, init);
  }

  const passwordSHA512 = context.request.headers.get(HEADERS.PASSWORD_SHA512);
  const customMetadata = getCustomMetadata(obj);

  if (!passwordSHA512 || passwordSHA512 !== customMetadata.passwordSHA512) {
    init.status = FORBIDDEN;
    return new Response(body, init);
  }

  if (hasExpired(obj.uploaded)) {
    await bucket.delete(fileKey);
    init.status = NOT_FOUND;
    return new Response(body, init);
  }

  const { readable, writable } = new TransformStream();
  obj.body.pipeTo(writable);

  body = readable;
  init.headers['Access-Control-Expose-Headers'] = HEADERS.CUSTOM_METADATA;
  delete customMetadata.passwordSHA512;
  init.headers[HEADERS.CUSTOM_METADATA] = JSON.stringify(customMetadata);
  return new Response(body, init);
};

/**
 * DELETE /api/files/[key]
 *
 * @param context - Context.
 * @returns - Response.
 */
export const onRequestDelete: PagesFunction<Env, Params> = async (context) => {
  const body: BodyInit = null;
  const init = getResponseInit(context.env.NODE_ENV);

  const fileKey = context.params.key as string;
  const bucket = getBucket(context);
  const obj = await bucket.head(fileKey);

  if (obj) {
    await bucket.delete(fileKey);
    return new Response(body, init);
  }

  init.status = NOT_FOUND;
  return new Response(body, init);
};

/**
 * OPTIONS /api/files/[key]
 *
 * @param context - Context.
 * @returns - Response.
 */
export const onRequestOptions: PagesFunction<Env, Params> = async (context) => {
  return new Response(null, getResponseInit(context.env.NODE_ENV));
};

/**
 * Checks if file has expired.
 *
 * @param uploaded - Uploaded date.
 * @param expiration - Expiration days.
 * @returns - Whether file has expired.
 */
function hasExpired(
  uploaded: Date,
  expirationDays = EXPIRATION.DAYS_7,
): boolean {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + expirationDays);
  return uploaded > expiration;
}
