import { BlobReader, BlobWriter, ZipReader, ZipWriter } from '@zip.js/zip.js';
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
    files.map((file) => zipWriter.add(file.name, new BlobReader(file)))
  );
  return zipWriter.close();
}

/**
 * Creates encrypted zip file.
 *
 * @param files - Files.
 * @param password - Password.
 * @returns - Zip file.
 */
export async function createZipFile(
  files: File[],
  password: string
): Promise<Blob> {
  const blob = await zip(files);
  const file = new File([blob], 'Archive.zip', { type: MIME.ZIP });
  return zip([file], password);
}

/**
 * Unzips encrypted zip file.
 *
 * @param file - Zip file.
 * @param password - Password.
 * @returns - Zip file.
 */
export async function unzip(file: Blob, password: string): Promise<Blob> {
  const blobReader = new BlobReader(file);
  const blobWriter = new BlobWriter();
  const zipReader = new ZipReader(blobReader, { password });
  const [firstFile] = await zipReader.getEntries();
  const data = await firstFile.getData!(blobWriter);
  await zipReader.close();
  return data;
}
