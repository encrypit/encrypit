import * as zip from '@zip.js/zip.js';
import { MIME } from 'shared/constants';
import { mockFiles } from 'test/helpers';

import { createZipFile, unzip } from './zip';

const mockedZip = jest.mocked(zip);

beforeAll(() => {
  (['BlobReader', 'BlobWriter', 'ZipReader', 'ZipWriter'] as const).forEach(
    (method) => jest.spyOn(zip, method)
  );
});

afterAll(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('createZipFile', () => {
  const files = mockFiles();
  const mockZipWriter = {
    add: jest.fn(),
    close: jest.fn(),
  };
  const password = 'password';

  beforeAll(() => {
    mockZipWriter.close.mockReset().mockResolvedValue(new Blob());
    mockedZip.ZipWriter.mockReset().mockReturnValue({
      add: mockZipWriter.add,
      close: mockZipWriter.close,
    });
  });

  it('returns a blob', async () => {
    const zipFile = await createZipFile(files, password);
    expect(zipFile).toBeInstanceOf(Blob);
  });

  it('creates a zip file', async () => {
    await createZipFile(files, password);
    expect(zip.BlobWriter).toBeCalledWith(MIME.ZIP);
    expect(zip.ZipWriter).toBeCalledTimes(2);
    files.forEach((file) => {
      expect(zip.BlobReader).toBeCalledWith(file);
      expect(mockZipWriter.add).toBeCalledWith(file.name, expect.anything());
    });
    expect(zip.ZipWriter).toBeCalledTimes(2);
    expect(mockZipWriter.close).toBeCalledTimes(2);
  });
});

describe('unzip', () => {
  const blob = new Blob([]);
  const mockZipReader = {
    getEntries: jest.fn(() => [{ getData: jest.fn(() => blob) }]),
    close: jest.fn(),
  };
  const password = 'password';

  beforeAll(() => {
    mockZipReader.close.mockReset().mockResolvedValue(new Blob());
    mockedZip.ZipReader.mockReset().mockReturnValue({
      getEntries: mockZipReader.getEntries,
      close: mockZipReader.close,
    } as unknown as zip.ZipReader<unknown>);
  });

  it('returns a blob', async () => {
    const file = await unzip(blob, password);
    expect(file).toBeInstanceOf(Blob);
  });

  it('unzips a zip file', async () => {
    await unzip(blob, password);
    expect(zip.BlobWriter).toBeCalledTimes(1);
    expect(zip.ZipReader).toBeCalledTimes(1);
    expect(zip.ZipReader).toBeCalledWith(expect.anything(), {
      password:
        'password:cGFzc3dvcmQ=:5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8:5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8:a8b64babd0aca91a59bdbb7761b421d4f2bb38280d3a75ba0f21f2bebc45583d446c598660c94ce680c47d19c30783a7:b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86',
    });
    expect(mockZipReader.getEntries).toBeCalledTimes(1);
    expect(mockZipReader.close).toBeCalledTimes(1);
  });
});
