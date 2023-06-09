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
