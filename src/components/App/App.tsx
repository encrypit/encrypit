import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import routes from 'src/routes';
import { store } from 'src/store';

import Snackbar from '../Snackbar';
import theme from './theme';

const router = createBrowserRouter(createRoutesFromElements(routes));

export default function App() {
  return (
    <StrictMode>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
          <Snackbar />
        </Provider>
      </ThemeProvider>
    </StrictMode>
  );
}
