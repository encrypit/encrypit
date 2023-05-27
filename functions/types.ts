export interface Env {
  BUCKET: R2Bucket;
  NODE_ENV: 'development' | 'staging' | 'production';
}
