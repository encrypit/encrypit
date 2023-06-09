import { FORM_DATA } from 'shared/constants';

interface Data {
  file: Blob;
  version: string;
}

/**
 * Creates FormData.
 *
 * @param data - Data.
 */
export function createFormData({ file, version }: Data): FormData {
  const formData = new FormData();
  formData.append(FORM_DATA.FILE, file);
  formData.append(FORM_DATA.VERSION, version);
  return formData;
}
