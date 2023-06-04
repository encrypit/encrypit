import * as zip from '@zip.js/zip.js';
import { MIME } from 'src/constants';
import { mockFiles } from 'test/helpers';

import { createZipFile } from './zip';

const mockedZip = jest.mocked(zip);

beforeAll(() => {
  jest.spyOn(zip, 'BlobReader');
  jest.spyOn(zip, 'BlobWriter');
  jest.spyOn(zip, 'ZipWriter');
});

afterAll(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('createZipFile', () => {
  const files = mockFiles();
  const zipWriterAdd = jest.fn();
  const zipWriterClose = jest.fn();

  beforeEach(() => {
    zipWriterClose.mockResolvedValueOnce(new Blob());
    mockedZip.ZipWriter.mockReturnValueOnce({
      add: zipWriterAdd,
      close: zipWriterClose,
    });
  });

  it('returns blob', async () => {
    const zipFile = await createZipFile(files);
    expect(zipFile).toBeInstanceOf(Blob);
  });

  it('creates zip file', async () => {
    await createZipFile(files);
    expect(zip.BlobWriter).toBeCalledWith(MIME.ZIP);
    expect(zip.ZipWriter).toBeCalledTimes(1);
    files.forEach((file) => {
      expect(zip.BlobReader).toBeCalledWith(file);
      expect(zipWriterAdd).toBeCalledWith(file.name, expect.anything());
    });
    expect(zip.ZipWriter).toBeCalledTimes(1);
    expect(zipWriterClose).toBeCalledTimes(1);
  });
});
