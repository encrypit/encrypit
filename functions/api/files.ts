import { FILE } from '../../src/constants';
import type { Env } from '../types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const formData = await context.request.formData();
  const file = formData.get(FILE) as unknown as File;
  const fileData = await file.arrayBuffer();
  const uuid = crypto.randomUUID();
  const obj = await context.env.BUCKET.put(uuid, fileData);
  obj.writeHttpMetadata(context.request.headers);

  const init: ResponseInit = {};
  if (context.env.NODE_ENV === 'development') {
    init.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    };
  }
  const body: BodyInit = uuid;
  return new Response(body, init);
};
