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

it('renders home', () => {
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
  it('renders file link', () => {
    const key = 'abc123';
    const link = `${location.origin}/${key}`;
    store.dispatch(actions.setFile({ key }));
    renderWithProviders(<Share />);
    expect(mockNavigate).not.toBeCalled();
    expect(screen.getByText(link)).toHaveAttribute('to', link);
  });
});
