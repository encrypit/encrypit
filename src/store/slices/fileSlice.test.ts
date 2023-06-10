import { fileSlice, initialState } from './fileSlice';

const { actions, reducer } = fileSlice;

const files = [
  {
    name: 'filename',
    type: 'application/octet-stream',
    data: 'data:application/octet-stream;base64,',
  },
];
const key = 'abc123';

describe('resetFile', () => {
  it('sets initialState', () => {
    const state = {
      ...initialState,
      files,
      key,
    };
    expect(reducer(state, actions.resetFile())).toBe(initialState);
  });
});

describe('setFile', () => {
  it('sets file and key', () => {
    const payload = {
      files,
      key,
    };
    expect(reducer(initialState, actions.setFile(payload))).toEqual({
      files,
      key,
    });
  });
});

describe('addFiles', () => {
  it('adds files', () => {
    const payload = Array(2).fill('data:application/octet-stream;base64,');
    expect(reducer(initialState, actions.addFiles(payload)).files).toEqual([
      ...initialState.files,
      ...payload,
    ]);
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
