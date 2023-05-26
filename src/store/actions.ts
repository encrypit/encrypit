import { userSlice } from './slices';

export const actions = {
  ...userSlice.actions,
};

export const resetActions = [actions.resetUser];
