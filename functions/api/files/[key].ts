import { HEADERS, HTTP_STATUS_CODES } from '../../../src/constants';
import type { Env } from '../../types';
import { getResponseInit } from '../../utils';

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
  const obj = await context.env.BUCKET.get(fileKey);

  if (!obj) {
    init.status = HTTP_STATUS_CODES.NOT_FOUND;
    return new Response(body, init);
  }

  const { readable, writable } = new TransformStream();
  obj.body.pipeTo(writable);

  body = readable;
  init.headers['Content-Disposition'] = 'attachment';
  init.headers['Access-Control-Expose-Headers'] = HEADERS.CUSTOM_METADATA;
  init.headers[HEADERS.CUSTOM_METADATA] = JSON.stringify(obj.customMetadata);
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
  const obj = await context.env.BUCKET.head(fileKey);

  if (obj) {
    await context.env.BUCKET.delete(fileKey);
    return new Response(body, init);
  }

  init.status = HTTP_STATUS_CODES.NOT_FOUND;
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
