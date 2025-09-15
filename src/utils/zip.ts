import {
  BlobReader,
  BlobWriter,
  FileEntry,
  ZipReader,
  ZipWriter,
} from '@zip.js/zip.js';
import { digest } from 'pepto';
import { MIME } from 'shared/constants';

const zipWriterOptions = {
  zip64: true,
  level: 9,
  bufferedWrite: true,
};

/**
 * Creates zip file.
 *
 * @param files - Files.
 * @param password - Password.
 * @returns - Zip file.
 */
async function zip(files: File[], password?: string): Promise<Blob> {
  const zipWriter = new ZipWriter(new BlobWriter(MIME.ZIP), {
    ...zipWriterOptions,
    password,
  });

  await Promise.all(
    files.map((file) => zipWriter.add(file.name, new BlobReader(file))),
  );

  return zipWriter.close();
}

/**
 * Creates a zip file and then encrypts it.
 *
 * @param files - Files.
 * @param password - Password.
 * @returns - Zip file.
 */
export async function createZipFile(
  files: File[],
  password: string,
): Promise<Blob> {
  const blob = await zip(files);
  const file = new File([blob], 'Archive.zip', { type: MIME.ZIP });

  return zip([file], await stretchPassword(password));
}

/**
 * Decrypts zip file.
 *
 * @param file - Zip file.
 * @param password - Password.
 * @returns - Zip file.
 */
export async function unzip(file: Blob, password: string): Promise<Blob> {
  const blobReader = new BlobReader(file);
  const blobWriter = new BlobWriter();
  const zipReader = new ZipReader(blobReader, {
    password: await stretchPassword(password),
  });

  const [firstEntry] = await zipReader.getEntries();
  const data = await (firstEntry as FileEntry).getData(blobWriter);
  await zipReader.close();
  return data;
}

/**
 * Increases password length via key stretching.
 *
 * @param password - Password.
 * @returns - Stretched password.
 */
async function stretchPassword(password: string): Promise<string> {
  const hashes = await Promise.all(
    (['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const).map((algorithm) =>
      digest(algorithm, password),
    ),
  );

  return [password, btoa(password)].concat(hashes).join(':');
}
