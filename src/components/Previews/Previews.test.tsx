import { screen } from '@testing-library/react';
import { useSelector } from 'src/hooks';
import type { RootState } from 'src/types';
import { renderWithProviders } from 'test/helpers';

import Previews from './Previews';

jest.mock('src/hooks', () => ({
  ...jest.requireActual('src/hooks'),
  useSelector: jest.fn(),
}));

const mockedUseSelector = jest.mocked(useSelector);

const name = 'filename';

describe('without files', () => {
  beforeEach(() => {
    const state = {
      file: {},
    };
    mockedUseSelector.mockImplementationOnce((callback) =>
      callback(state as unknown as RootState)
    );
  });

  it('does not render filename', () => {
    renderWithProviders(<Previews />);
    expect(screen.queryByText(name)).not.toBeInTheDocument();
  });
});

describe('with files', () => {
  const files = [
    {
      name,
      type: 'application/octet-stream',
      data: 'data:application/octet-stream;base64,',
      id: crypto.randomUUID(),
    },
  ];

  beforeEach(() => {
    const state = {
      file: {
        files,
      },
    };
    mockedUseSelector.mockImplementationOnce((callback) =>
      callback(state as unknown as RootState)
    );
  });

  it('renders the filename', () => {
    renderWithProviders(<Previews />);
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
