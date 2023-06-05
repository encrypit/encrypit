import type { Env } from 'functions/types';
import { getBucket, getResponseInit } from 'functions/utils';
import { generateFileKey } from 'shared/id';
import { FILE, HTTP_STATUS_CODES } from 'src/constants';

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
  const fileKey = await getFileKey(bucket);

  await bucket.put(fileKey, await file.arrayBuffer(), {
    customMetadata: {
      size: String(file.size),
      type: file.type,
    },
    httpMetadata: context.request.headers,
  });

  body = fileKey;
  return new Response(body, init);
};

/**
 * Gets file key.
 *
 * @param bucket - R2 bucket.
 * @returns - File key.
 */
async function getFileKey(bucket: R2Bucket): Promise<string> {
  const fileKey = generateFileKey();
  const obj = await bucket.head(fileKey);
  if (obj) {
    return getFileKey(bucket);
  }
  await bucket.put(fileKey, null);
  return fileKey;
}
