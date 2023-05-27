import { act, fireEvent, screen } from '@testing-library/react';
import { fetch, mockData, mockFiles, renderWithProviders } from 'test/helpers';

import Dropzone from './Dropzone';

it('renders Dropzone', () => {
  renderWithProviders(<Dropzone />);
  expect(
    screen.getByRole('button', { name: /Drag and drop your file here/ })
  ).toBeInTheDocument();
  expect(screen.getByText('1 file max and 5 MB limit')).toBeInTheDocument();
});

it.each(['click', 'focus', 'blur'] as const)(
  'fires events %s on Dropzone',
  async (eventName) => {
    renderWithProviders(<Dropzone />);
    await act(() => {
      const rootElement = screen.getByRole('presentation');
      fireEvent[eventName](rootElement);
    });
    expect(
      screen.getByText(/Drag and drop your file here/)
    ).toBeInTheDocument();
  }
);

it('drags file to Dropzone', async () => {
  renderWithProviders(<Dropzone />);

  await act(() => {
    const rootElement = screen.getByRole('presentation');
    fireEvent.dragEnter(rootElement, mockData());
  });

  expect(
    screen.getByRole('button', { name: /Drop your file here/ })
  ).toBeInTheDocument();
});

describe('drop', () => {
  const uuid = 'uuid';

  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  afterAll(() => {
    // eslint-disable-next-line no-console
    (console.log as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    // eslint-disable-next-line no-console
    (console.log as jest.Mock).mockClear();

    fetch.mockResolvedValueOnce({
      text: jest.fn().mockResolvedValueOnce(uuid),
    } as unknown as Response);
  });

  it('drops file to Dropzone', async () => {
    renderWithProviders(<Dropzone />);

    await act(() => {
      fireEvent.drop(screen.getByRole('presentation'), mockData());
    });

    // eslint-disable-next-line no-console
    expect(console.log).toBeCalledWith(uuid);
  });

  it('rejects if there are too many files', async () => {
    renderWithProviders(<Dropzone />);

    await act(() => {
      fireEvent.drop(screen.getByRole('presentation'), mockData(mockFiles(2)));
    });

    // eslint-disable-next-line no-console
    expect(console.log).not.toBeCalled();
  });
});
