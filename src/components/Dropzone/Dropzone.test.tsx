import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { mockData, mockFiles, renderWithProviders, store } from 'test/helpers';

import Dropzone from './Dropzone';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(jest.fn),
}));

jest.mock('src/utils', () => ({
  ...jest.requireActual('src/utils'),
  createZipFile: jest.fn().mockResolvedValue(new Blob()),
}));

it('renders Dropzone', () => {
  renderWithProviders(<Dropzone />);
  expect(
    screen.getByRole('button', { name: 'Drag and drop your file' })
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
    expect(screen.getByText('Drag and drop your file')).toBeInTheDocument();
  }
);

it('drags file to Dropzone', async () => {
  renderWithProviders(<Dropzone />);
  await act(() => {
    const rootElement = screen.getByRole('presentation');
    fireEvent.dragEnter(rootElement, mockData());
  });
  expect(
    screen.getByRole('button', { name: 'Drop your file' })
  ).toBeInTheDocument();
});

describe('drop', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('drops file to Dropzone', async () => {
    renderWithProviders(<Dropzone />);
    await act(() => {
      fireEvent.drop(screen.getByRole('presentation'), mockData());
    });
    await waitFor(() => {
      expect(store.getState().file).toMatchInlineSnapshot(`
        {
          "files": [],
          "key": "",
          "password": "",
        }
      `);
    });
  });

  it('rejects if there are too many files', async () => {
    renderWithProviders(<Dropzone />);
    await act(() => {
      fireEvent.drop(screen.getByRole('presentation'), mockData(mockFiles(2)));
    });
    await waitFor(() => {
      expect(store.getState().file).toMatchInlineSnapshot(`
        {
          "files": [],
          "key": "",
          "password": "",
        }
      `);
    });
  });
});
