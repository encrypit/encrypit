import { FORM_DATA } from 'shared/constants';
import { APP_VERSION } from 'src/config';

import { hashPassword } from './hash';

interface Data {
  file: Blob;
  password: string;
  version?: string;
}

/**
 * Creates FormData.
 *
 * @param data - File, password, and version.
 * @returns - Form data.
 */
export async function createFormData({
  file,
  password,
  version = APP_VERSION,
}: Data): Promise<FormData> {
  const formData = new FormData();

  formData.append(FORM_DATA.FILE, file);
  formData.append(FORM_DATA.VERSION, version);
  formData.append(FORM_DATA.PASSWORD_SHA512, await hashPassword(password));

  return formData;
}
