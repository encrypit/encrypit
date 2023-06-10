import { FORM_DATA } from 'shared/constants';
import { APP_VERSION } from 'src/config';

import { createFormData } from './form';

describe('createFormData', () => {
  it('creates form data with file', () => {
    const file = new Blob();
    const formData = createFormData({ file });
    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get(FORM_DATA.FILE)).toBeInstanceOf(File);
    expect(formData.get(FORM_DATA.VERSION)).toBe(APP_VERSION);
  });

  it('creates form data with file and version', () => {
    const file = new Blob();
    const version = '1.2.3';
    const formData = createFormData({ file, version });
    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get(FORM_DATA.FILE)).toBeInstanceOf(File);
    expect(formData.get(FORM_DATA.VERSION)).toBe(version);
  });
});
