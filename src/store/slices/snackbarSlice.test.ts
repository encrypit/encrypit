import { initialState, snackbarSlice } from './snackbarSlice';

const { actions, reducer } = snackbarSlice;

const snackbarState = {
  anchorOrigin: {
    horizontal: 'left',
    vertical: 'bottom',
  },
  autoHideDuration: 5000,
  message: 'Hello, world!',
  open: true,
} as const;

describe('resetSnackbar', () => {
  it('sets initialState', () => {
    const state = {
      ...initialState,
      ...snackbarState,
    };
    expect(reducer(state, actions.resetSnackbar())).toBe(initialState);
  });
});

describe('setSnackbar', () => {
  it('sets snackbar', () => {
    const payload = snackbarState;
    expect(reducer(initialState, actions.setSnackbar(payload))).toEqual({
      ...initialState,
      ...snackbarState,
    });
  });
});
