import { grey, red, yellow } from '@mui/material/colors';

/**
 * @see {@link https://react-dropzone.js.org/#section-styling-dropzone}
 */
export const baseStyle = {
  alignItems: 'center',
  backgroundColor: grey[50],
  borderColor: grey[300],
  borderRadius: 2,
  borderStyle: 'dashed',
  borderWidth: 2,
  cursor: 'pointer',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  outline: 'none',
  padding: '5rem 1rem',
  transition: 'border .24s ease-in-out',
} as const;

export const focusedStyle = {
  borderColor: red[900],
} as const;

export const acceptStyle = {
  borderColor: red[900],
} as const;

export const rejectStyle = {
  borderColor: yellow[900],
} as const;
