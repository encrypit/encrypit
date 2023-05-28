import { fileSlice, userSlice } from './slices';

export const actions = {
  ...fileSlice.actions,
  ...userSlice.actions,
};

export const resetActions = [actions.resetFile, actions.resetUser];
