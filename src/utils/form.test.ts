import { FILE } from 'shared/constants';

import { createFormData } from './form';

describe('createFormData', () => {
  it('creates form data with file', () => {
    const blob = new Blob();
    const formData = createFormData(blob);
    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get(FILE)).toBeInstanceOf(File);
  });
});
