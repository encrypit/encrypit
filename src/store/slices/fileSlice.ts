import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { FileData } from 'src/types';

export const initialState: FileData = {
  files: [],
  key: '',
  password: '',
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,

  reducers: {
    resetFile: () => initialState,

    setFile: (state, action: PayloadAction<FileData>) => {
      Object.assign(state, action.payload);
    },

    addFiles: (state, action: PayloadAction<FileData['files']>) => {
      state.files.push(...action.payload);
    },

    setFileKeyOrPassword: (
      state,
      action: PayloadAction<{ key?: string; password?: string }>
    ) => {
      const { key, password } = action.payload;
      if (key) {
        state.key = key;
      }
      if (password) {
        state.password = password;
      }
      state.files = [];
    },
  },
});
