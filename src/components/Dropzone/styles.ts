/**
 * @see {@link https://react-dropzone.js.org/#section-styling-dropzone}
 */
export const baseStyle = {
  alignItems: 'center',
  backgroundColor: '#fafafa',
  borderColor: '#eeeeee',
  borderRadius: 2,
  borderStyle: 'dashed',
  borderWidth: 2,
  color: '#bdbdbd',
  cursor: 'pointer',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  outline: 'none',
  padding: '20px',
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
