import { useDispatch as useReactReduxDispatch } from 'react-redux';

import type { store } from '../store';

export const useDispatch = () => useReactReduxDispatch<typeof store.dispatch>();
