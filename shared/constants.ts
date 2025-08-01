export enum FORM_DATA {
  FILE = 'FILE',
  PASSWORD_SHA512 = 'PASSWORD_SHA512',
  VERSION = 'VERSION',
}

export const ONE_MEGABYTE_IN_BYTES = 1048576;

export enum EXPIRATION {
  DAYS_7 = 7,
}

export enum MAX_SIZE {
  DEFAULT = ONE_MEGABYTE_IN_BYTES * 5,
}

export enum MAX_FILES {
  DEFAULT = 1,
}

export enum HEADERS {
  CUSTOM_METADATA = 'X-Custom-Metadata',
  PASSWORD_SHA512 = 'X-Password-Sha512',
}

export enum FILE {
  // https://github.com/ai/nanoid#api
  KEY_ALPHABET = 'A-Za-z0-9_-',
  KEY_LENGTH = 9,
  // https://stackoverflow.com/a/26119120
  PASSWORD_ALPHABET = '-abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ?/@_~!$&*+=',
  PASSWORD_LENGTH = 12,
}

export const FILE_KEY_REGEX = new RegExp(
  // TODO: remove `7,`
  `^[${FILE.KEY_ALPHABET}]{7,${FILE.KEY_LENGTH}}$`,
);

export const FILE_PASSWORD_REGEX = new RegExp(
  // TODO: remove `9,`
  `^[${FILE.PASSWORD_ALPHABET}]{9,${FILE.PASSWORD_LENGTH}}$`,
);

/**
 * @see {@link https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types}
 */
export enum MIME {
  ZIP = 'application/zip',
}
