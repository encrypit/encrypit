import { renderHook } from '@testing-library/react';

import { useStyle } from './useStyle';

it('renders base style by default', () => {
  const { result } = renderHook(() => useStyle({}));
  expect(result.current).toMatchInlineSnapshot(`
    {
      "alignItems": "center",
      "backgroundColor": "#fafafa",
      "borderColor": "#e0e0e0",
      "borderRadius": 2,
      "borderStyle": "dashed",
      "borderWidth": 2,
      "cursor": "pointer",
      "display": "flex",
      "flex": 1,
      "flexDirection": "column",
      "outline": "none",
      "padding": "6rem 1rem",
      "transition": "border .24s ease-in-out",
    }
  `);
});

it.each([
  { isFocused: false, isDragAccept: false, isDragReject: false },
  { isFocused: true, isDragAccept: false, isDragReject: false },
  { isFocused: false, isDragAccept: true, isDragReject: false },
  { isFocused: false, isDragAccept: false, isDragReject: true },
])(
  'renders style when isFocused=$isFocused, isDragAccept=$isDragAccept, isDragReject=$isDragReject',
  (props) => {
    const { result } = renderHook(() => useStyle(props));
    expect(result.current).toMatchSnapshot();
  },
);
