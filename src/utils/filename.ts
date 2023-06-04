/**
 * Generates file name with extension.
 *
 * @returns - File name.
 */
export function generateFileName(): string {
  return `encrypit-download-${getISOString()}.zip`;
}

/**
 * Gets clean ISO string.
 *
 * @returns - ISO with special characters removed.
 */
function getISOString(): string {
  const date = new Date();

  return date
    .toISOString()
    .split('.')[0]
    .replaceAll('-', '')
    .replaceAll(':', '');
}
