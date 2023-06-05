import { BlobReader, BlobWriter, ZipWriter } from '@zip.js/zip.js';
import { MIME } from 'shared/constants';

export async function createZipFile(files: File[]): Promise<Blob> {
  const zipWriter = new ZipWriter(new BlobWriter(MIME.ZIP), {
    zip64: true,
    level: 9,
    bufferedWrite: true,
  });

  files.forEach((file) => zipWriter.add(file.name, new BlobReader(file)));
  return zipWriter.close();
}
