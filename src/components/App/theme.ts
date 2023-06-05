import { grey, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: red[900],
    },
    secondary: {
      main: grey['900'],
    },
  },
});
