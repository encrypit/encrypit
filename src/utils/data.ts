enum Events {
  error = 'error',
  loadend = 'loadend',
}

/**
 * Converts Blob to Base64.
 *
 * @param blob - Blob.
 * @returns - Base64.
 */
export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    function loadend() {
      resolve(reader.result as string);
      reader.removeEventListener(Events.loadend, loadend);
    }
    reader.addEventListener(Events.loadend, loadend);

    /* istanbul ignore next */
    function error() {
      reject(reader.error);
      reader.removeEventListener(Events.error, error);
    }
    reader.addEventListener(Events.error, error);

    reader.readAsDataURL(blob);
  });
}

/**
 * Converts Base64 to Blob.
 *
 * @param base64 - Base64.
 * @returns - Blob.
 */
export async function base64ToBlob(base64: string): Promise<Blob> {
  const response = await fetch(base64);
  return response.blob();
}

/**
 * Converts Base64 to File.
 *
 * @param base64 - Base64.
 * @param filename - Filename.
 * @param options - Options.
 * @returns - File.
 */
export async function base64ToFile(
  base64: string,
  filename: string,
  options: FilePropertyBag
): Promise<File> {
  const response = await fetch(base64);
  const blob = await response.blob();
  return new File([blob], filename, options);
}
