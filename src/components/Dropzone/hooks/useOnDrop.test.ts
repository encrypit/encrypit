import { renderHook } from '@testing-library/react';

import { useOnDrop } from './useOnDrop';

it('returns onDrop callback', () => {
  const { result } = renderHook(() => useOnDrop());
  expect(result.current).toBeInstanceOf(Function);
});
