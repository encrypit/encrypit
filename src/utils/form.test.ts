import { FORM_DATA } from 'shared/constants';

import { createFormData } from './form';

describe('createFormData', () => {
  it('creates form data with file and version', () => {
    const file = new Blob();
    const version = '1.0.0';
    const formData = createFormData({ file, version });
    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get(FORM_DATA.FILE)).toBeInstanceOf(File);
    expect(formData.get(FORM_DATA.VERSION)).toBe(version);
  });
});
