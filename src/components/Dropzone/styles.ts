/**
 * @see {@link https://react-dropzone.js.org/#section-styling-dropzone}
 */
export const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
} as const;

export const focusedStyle = {
  borderColor: '#2196f3',
} as const;

export const acceptStyle = {
  borderColor: '#00e676',
} as const;

export const rejectStyle = {
  borderColor: '#ff1744',
} as const;
