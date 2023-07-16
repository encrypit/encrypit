import { fireEvent, screen } from '@testing-library/react';
import { actions, renderWithProviders, store } from 'test/helpers';

import Previews from './Previews';

const name = 'filename';

describe('without files', () => {
  it('does not render filename', () => {
    renderWithProviders(<Previews />);
    expect(screen.queryByText(name)).not.toBeInTheDocument();
  });
});

describe('with files', () => {
  const files = [
    {
      lastModified: 0,
      name,
      size: 0,
      type: 'application/octet-stream',
      data: 'data:application/octet-stream;base64,',
      id: crypto.randomUUID(),
    },
  ];

  beforeEach(() => {
    store.dispatch(actions.addFiles(files));
  });

  it('renders the filename', () => {
    renderWithProviders(<Previews />);
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it('deletes the file', () => {
    renderWithProviders(<Previews />);
    fireEvent.click(screen.getByTestId('CancelIcon'));
    expect(screen.queryByText(name)).not.toBeInTheDocument();
  });
});
