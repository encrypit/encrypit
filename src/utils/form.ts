import { FILE } from 'src/constants';

export function createFormData(file: Blob): FormData {
  const formData = new FormData();
  formData.append(FILE, file);
  return formData;
}
