import { blobToBase64 } from './data';

it('converts blob to base64', async () => {
  const text = 'text';
  const blob = new Blob([text]);
  const base64 = await blobToBase64(blob);
  expect(base64).toContain('base64,' + btoa(text));
  expect(base64).toBe('data:application/octet-stream;base64,dGV4dA==');
});
