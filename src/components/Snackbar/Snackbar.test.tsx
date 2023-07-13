import { fireEvent, screen, waitFor } from '@testing-library/react';
import { actions } from 'src/store';
import { renderWithProviders, store } from 'test/helpers';

import Snackbar from './Snackbar';

const message = 'message';

it('does not render snackbar by default', () => {
  renderWithProviders(<Snackbar />);
  expect(screen.queryByText(message)).not.toBeInTheDocument();
});

it('renders snackbar message when open', () => {
  store.dispatch(actions.setSnackbar({ message, open: true }));
  renderWithProviders(<Snackbar />);
  expect(screen.getByText(message)).toBeInTheDocument();
});

it('closes snackbar when close button is clicked', async () => {
  store.dispatch(actions.setSnackbar({ message, open: true }));
  renderWithProviders(<Snackbar />);
  fireEvent.click(screen.getByLabelText('Close'));
  await waitFor(() => {
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });
});

it('auto hides snackbar', async () => {
  store.dispatch(
    actions.setSnackbar({ autoHideDuration: 0, message, open: true }),
  );
  renderWithProviders(<Snackbar />);
  expect(screen.getByText(message)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });
});
