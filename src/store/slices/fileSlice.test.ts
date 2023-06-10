import { fileSlice, initialState } from './fileSlice';

const { actions, reducer } = fileSlice;

const file = 'data:application/octet-stream;base64,';
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
  it('sets file and key', () => {
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

describe('setFileKey', () => {
  it('sets file key', () => {
    const payload = 'fileKey';
    expect(reducer(initialState, actions.setFileKey(payload))).toEqual({
      ...initialState,
      key: payload,
    });
  });
});
