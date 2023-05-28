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

  const fileData = await file.arrayBuffer();
  const uuid = crypto.randomUUID();
  const obj = await context.env.BUCKET.put(uuid, fileData);
  obj.writeHttpMetadata(context.request.headers);

  body = uuid;
  return new Response(body, init);
};
