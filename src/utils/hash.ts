import { digest } from 'pepto';

const algorithm = 'SHA-512';

/**
 * Hashes password into SHA-512.
 *
 * @param password - Password.
 * @returns - SHA-512.
 */
export function hashPassword(password: string): Promise<string> {
  return digest(algorithm, password);
}
