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
  PASSWORD_SHA512 = 'X-Password-SHA-512',
}

export enum FILE {
  KEY_LENGTH = 7,
  // https://stackoverflow.com/a/26119120
  PASSWORD_ALPHABET = '-abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ?/@_~!$&*+=',
  PASSWORD_LENGTH = 9,
}

export const FILE_PASSWORD_REGEX = new RegExp(
  `^[${FILE.PASSWORD_ALPHABET}]{${FILE.PASSWORD_LENGTH}}$`
);

/**
 * @see {@link https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types}
 */
export enum MIME {
  ZIP = 'application/zip',
}

/**
 * @see {@link https://wikipedia.org/wiki/List_of_HTTP_status_codes}
 */
export enum HTTP_STATUS_CODES {
  LENGTH_REQUIRED = 411,
  NOT_FOUND = 404,
}
