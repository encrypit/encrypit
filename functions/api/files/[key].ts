import { HTTP_STATUS_CODES } from '../../../src/constants';
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

  body = await obj.arrayBuffer();
  return new Response(body, init);
};
