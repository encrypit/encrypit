import { fetchMock } from 'test/helpers';

import { base64ToBlob, base64ToFile, blobToBase64 } from './data';

beforeEach(() => {
  fetchMock.mockImplementationOnce(
    (base64: unknown) =>
      ({
        blob: () => new Blob([atob((base64 as string).split(',')[1])]),
      } as unknown as Promise<Response>)
  );
});

describe('blobToBase64', () => {
  const text = 'text';
  const blob = new Blob([text], { type: 'text/plain' });

  it('converts Blob to Base64', async () => {
    const base64 = await blobToBase64(blob);
    expect(base64).toContain('base64,' + btoa(text));
    expect(base64).toBe('data:text/plain;base64,dGV4dA==');
  });

  it('converts Blob to Base64 to Blob', async () => {
    const base64 = await blobToBase64(blob);
    expect((await base64ToBlob(base64)).constructor.name).toBe('Blob');
  });
});

describe('base64ToBlob', () => {
  const base64 = 'data:text/plain;base64,dGV4dA==';

  it('converts Base64 to Blob', async () => {
    const blob = await base64ToBlob(base64);
    expect(blob.constructor.name).toBe('Blob');
    expect(blob.type).toBe('text/plain');
  });

  it('converts Base64 to Blob to Base64', async () => {
    const blob = await base64ToBlob(base64);
    expect(await blobToBase64(blob)).toBe(base64);
  });

  it('converts Base64 to Blob without MIME type', async () => {
    const base64 = 'data:;base64,dGV4dA==';
    const blob = await base64ToBlob(base64);
    expect(await blobToBase64(blob)).toBe(
      'data:application/octet-stream;base64,dGV4dA=='
    );
  });
});

describe('base64ToFile', () => {
  it('converts Base64 to File', async () => {
    const base64 = 'data:application/octet-stream;base64,dGV4dA==';
    const name = 'filename';
    const type = 'application/octet-stream';
    const file = await base64ToFile(base64, name, { type });
    expect(file).toBeInstanceOf(File);
    expect(file).toMatchObject({ name, type });
  });
});
