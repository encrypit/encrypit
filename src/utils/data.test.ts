import { base64ToBlob, blobToBase64 } from './data';

describe('blobToBase64', () => {
  it('converts Blob to Base64', async () => {
    const text = 'text';
    const blob = new Blob([text]);
    const base64 = await blobToBase64(blob);
    expect(base64).toContain('base64,' + btoa(text));
    expect(base64).toBe('data:application/octet-stream;base64,dGV4dA==');
  });
});

describe('base64ToBlob', () => {
  it('converts Base64 to Blob', async () => {
    const base64 = 'data:application/octet-stream;base64,dGV4dA==';
    const blob = await base64ToBlob(base64);
    expect(blob.constructor.name).toBe('Blob');
  });
});
