import { FORM_DATA } from 'shared/constants';
import { APP_VERSION } from 'src/config';

import { createFormData } from './form';

describe('createFormData', () => {
  const file = new Blob();
  const password = 'password';
  const version = '1.2.3';

  it('creates form data with file', async () => {
    const formData = await createFormData({ file, password });
    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get(FORM_DATA.FILE)).toBeInstanceOf(File);
    expect(formData.get(FORM_DATA.VERSION)).toBe(APP_VERSION);
  });

  it('creates form data with file and version', async () => {
    const formData = await createFormData({ file, password, version });
    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get(FORM_DATA.FILE)).toBeInstanceOf(File);
    expect(formData.get(FORM_DATA.VERSION)).toBe(version);
  });
});
