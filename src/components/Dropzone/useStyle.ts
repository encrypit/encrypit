import { useMemo } from 'react';

import { acceptStyle, baseStyle, focusedStyle, rejectStyle } from './styles';

export default function useStyle({
  isFocused = false,
  isDragAccept = false,
  isDragReject = false,
}) {
  return useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused && focusedStyle),
      ...(isDragAccept && acceptStyle),
      ...(isDragReject && rejectStyle),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
}
