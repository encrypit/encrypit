import { FILE, HTTP_STATUS_CODES } from '../../../src/constants';
import type { Env } from '../../types';
import { getResponseInit } from '../../utils';

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

  const uuid = crypto.randomUUID();
  await context.env.EXPIRATION_DAYS_7.put(uuid, await file.arrayBuffer(), {
    customMetadata: {
      lastModified: String(file.lastModified),
      name: file.name,
      size: String(file.size),
      type: file.type,
    },
    httpMetadata: context.request.headers,
  });

  body = uuid;
  return new Response(body, init);
};
