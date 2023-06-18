export interface Env {
  EXPIRATION_DAYS_7: R2Bucket;
  NODE_ENV: 'development' | 'preview' | 'production';
}

export type Context = EventContext<Env, string, unknown>;
