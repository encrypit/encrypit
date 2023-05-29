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
