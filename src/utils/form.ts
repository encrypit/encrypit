import { FORM_DATA } from 'shared/constants';
import { APP_VERSION } from 'src/config';

interface Data {
  file: Blob;
  version?: string;
}

/**
 * Creates FormData.
 *
 * @param data - Data.
 * @returns - Form data.
 */
export function createFormData({
  file,
  version = APP_VERSION,
}: Data): FormData {
  const formData = new FormData();
  formData.append(FORM_DATA.FILE, file);
  formData.append(FORM_DATA.VERSION, version);
  return formData;
}
