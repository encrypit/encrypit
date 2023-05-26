import { renderHook } from '@testing-library/react';

import useStyle from './useStyle';

it('renders base style by default', () => {
  const { result } = renderHook(() => useStyle({}));
  expect(result.current).toMatchInlineSnapshot(`
    {
      "alignItems": "center",
      "backgroundColor": "#fafafa",
      "borderColor": "#eeeeee",
      "borderRadius": 2,
      "borderStyle": "dashed",
      "borderWidth": 2,
      "color": "#bdbdbd",
      "cursor": "pointer",
      "display": "flex",
      "flex": 1,
      "flexDirection": "column",
      "outline": "none",
      "padding": "20px",
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
  }
);
