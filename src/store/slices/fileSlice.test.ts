import { fileSlice, initialState } from './fileSlice';

const { actions, reducer } = fileSlice;

const file = new File([''], '');
const key = 'abc123';

describe('resetFile', () => {
  it('sets initialState', () => {
    const state = {
      ...initialState,
      file,
      key,
    };
    expect(reducer(state, actions.resetFile())).toBe(initialState);
  });
});

describe('setFile', () => {
  it('sets file', () => {
    const payload = {
      file,
      key,
    };
    expect(reducer(initialState, actions.setFile(payload))).toEqual({
      ...initialState,
      file,
      key,
    });
  });
});
