import { red } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import routes from 'src/routes';
import { store } from 'src/store';

const router = createBrowserRouter(createRoutesFromElements(routes));

const theme = createTheme({
  palette: {
    primary: {
      main: red[900],
    },
  },
});

export default function App() {
  return (
    <StrictMode>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </StrictMode>
  );
}
