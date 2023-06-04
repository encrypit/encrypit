import { FILE, HTTP_STATUS_CODES } from '../../../src/constants';
import type { Env } from '../../types';
import { getBucket, getResponseInit } from '../../utils';

/**
 * POST /api/files
 *
 * @param context - Context.
 * @returns - Response.
 */
export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: BodyInit = null;
  const init = getResponseInit(context.env.NODE_ENV);

  const formData = await context.request.formData();
  const file = formData.get(FILE) as unknown as File;

  if (!file.size) {
    init.status = HTTP_STATUS_CODES.LENGTH_REQUIRED;
    return new Response(body, init);
  }

  const bucket = getBucket(context);
  const uuid = crypto.randomUUID();

  await bucket.put(uuid, await file.arrayBuffer(), {
    customMetadata: {
      size: String(file.size),
      type: file.type,
    },
    httpMetadata: context.request.headers,
  });

  body = uuid;
  return new Response(body, init);
};
