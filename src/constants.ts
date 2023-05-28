export const FILE = 'FILE';

export const ONE_MEGABYTE_IN_BYTES = 1048576;

export enum MAX_SIZE {
  DEFAULT = ONE_MEGABYTE_IN_BYTES * 5,
}

export enum MAX_FILES {
  DEFAULT = 1,
}

/**
 * @see {@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes}
 */
export enum HTTP_STATUS_CODES {
  LENGTH_REQUIRED = 411,
  NOT_FOUND = 404,
}
