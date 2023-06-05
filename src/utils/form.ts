import { FILE } from 'shared/constants';

export function createFormData(file: Blob): FormData {
  const formData = new FormData();
  formData.append(FILE, file);
  return formData;
}
