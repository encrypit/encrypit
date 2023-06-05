import { nanoid } from 'nanoid';

/**
 * Generates file key.
 *
 * @returns - File key.
 */
export function generateFileKey(): string {
  return nanoid(7);
}
