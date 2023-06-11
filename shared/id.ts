import { customAlphabet, nanoid } from 'nanoid';
import { FILE } from 'shared/constants';

/**
 * Generates file key.
 *
 * @returns - File key.
 */
export function generateFileKey(): string {
  return nanoid(FILE.KEY_LENGTH);
}

const password = customAlphabet(FILE.PASSWORD_ALPHABET, FILE.PASSWORD_LENGTH);

/**
 * Generates file password.
 *
 * @returns - File key.
 */
export function generateFilePassword(): string {
  return password();
}
