import { screen } from '@testing-library/react';
import { actions, renderWithProviders, store } from 'test/helpers';

import Share from './Share';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => mockNavigate),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

it('renders heading', () => {
  renderWithProviders(<Share />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'File link ready' })
  ).toBeInTheDocument();
});

describe('without file key', () => {
  it('navigates to home', () => {
    renderWithProviders(<Share />);
    expect(mockNavigate).toBeCalledWith('/', { replace: true });
  });
});

describe('with file key', () => {
  const key = 'abc123';
  const link = `${location.origin}/${key}`;

  beforeEach(() => {
    store.dispatch(actions.setFile({ key }));
  });

  it('does not navigate away', () => {
    renderWithProviders(<Share />);
    expect(mockNavigate).not.toBeCalled();
  });

  it('renders file link', () => {
    renderWithProviders(<Share />);
    expect(screen.getByText(link)).toHaveAttribute('to', link);
  });

  it('renders warning', () => {
    renderWithProviders(<Share />);
    expect(
      screen.getByText("The file will be deleted after it's downloaded.")
    ).toBeInTheDocument();
  });
});
