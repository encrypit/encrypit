import { customAlphabet, nanoid } from 'nanoid';

/**
 * Generates file key.
 *
 * @returns - File key.
 */
export function generateFileKey(): string {
  return nanoid(7);
}

// https://stackoverflow.com/a/26119120
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const password = customAlphabet(
  `0123456789${alphabet}${alphabet.toUpperCase()}?/:@-._~!$&'()*+,;=`,
  9
);

/**
 * Generates file password.
 *
 * @returns - File key.
 */
export function generateFilePassword(): string {
  return password();
}
