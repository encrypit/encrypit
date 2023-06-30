import { renderHook } from '@testing-library/react';
import { store, wrapper } from 'test/helpers';

import { useSnackbar } from './useSnackbar';

it('sets snackbar in store', () => {
  const { result } = renderHook(() => useSnackbar(), { wrapper });
  const snackbar = result.current;
  expect(store.getState().snackbar).toMatchInlineSnapshot(`
    {
      "anchorOrigin": {
        "horizontal": "center",
        "vertical": "top",
      },
      "autoHideDuration": 6000,
      "message": "",
      "open": false,
    }
  `);
  snackbar({ message: 'test', open: true });
  expect(store.getState().snackbar).toMatchInlineSnapshot(`
    {
      "anchorOrigin": {
        "horizontal": "center",
        "vertical": "top",
      },
      "autoHideDuration": 6000,
      "message": "test",
      "open": true,
    }
  `);
});
