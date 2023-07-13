import { fileSlice, initialState } from './fileSlice';

const { actions, reducer } = fileSlice;

const files = [
  {
    lastModified: 1589947200000,
    name: 'filename',
    size: 0,
    type: 'application/octet-stream',
    data: 'data:application/octet-stream;base64,',
    id: crypto.randomUUID(),
  },
];
const key = 'key';
const password = 'password';

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
  it('sets file, key, and password', () => {
    const payload = {
      files,
      key,
      password,
    };
    expect(reducer(initialState, actions.setFile(payload))).toEqual({
      files,
      key,
      password,
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

describe('setFileKeyOrPassword', () => {
  it('sets file key', () => {
    const payload = {
      key: 'fileKey',
    };
    expect(
      reducer(initialState, actions.setFileKeyOrPassword(payload)),
    ).toEqual({
      ...initialState,
      ...payload,
    });
  });

  it('sets password', () => {
    const payload = {
      password: 'filePassword',
    };
    expect(
      reducer(initialState, actions.setFileKeyOrPassword(payload)),
    ).toEqual({
      ...initialState,
      ...payload,
    });
  });

  it('sets file key and password', () => {
    const payload = {
      key: 'fileKey',
      password: 'filePassword',
    };
    expect(
      reducer(initialState, actions.setFileKeyOrPassword(payload)),
    ).toEqual({
      ...initialState,
      ...payload,
    });
  });
});
