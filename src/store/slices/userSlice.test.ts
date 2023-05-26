import { initialState, userSlice } from './userSlice';

const { actions, reducer } = userSlice;

const email = 'user@example.com';
const id = '1';

describe('resetUser', () => {
  it('sets initialState', () => {
    const state = {
      ...initialState,
      email,
      id,
    };
    expect(reducer(state, actions.resetUser())).toBe(initialState);
  });
});

describe('setUser', () => {
  it('sets user', () => {
    const payload = {
      email,
      id,
    };
    expect(reducer(initialState, actions.setUser(payload))).toEqual({
      ...initialState,
      email,
      id,
    });
  });
});
