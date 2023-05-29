export async function blobToBase64(blob: Blob): Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.addEventListener('loadend', () => resolve(reader.result as string));
    reader.readAsDataURL(blob);
  });
}
