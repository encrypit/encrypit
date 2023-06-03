import { act, fireEvent, screen } from '@testing-library/react';
import { mockData, mockFiles, renderWithProviders, store } from 'test/helpers';

import Dropzone from './Dropzone';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(jest.fn),
}));

const mockUploadFile = jest.fn();

jest.mock('src/hooks', () => ({
  ...jest.requireActual('src/hooks'),
  useUploadFileMutation: jest.fn(() => [mockUploadFile]),
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
  const uuid = 'uuid';

  beforeEach(() => {
    jest.clearAllMocks();
    mockUploadFile.mockReturnValueOnce({
      unwrap: jest.fn().mockResolvedValueOnce(uuid),
    });
  });

  it('drops file to Dropzone', async () => {
    renderWithProviders(<Dropzone />);
    await act(() => {
      fireEvent.drop(screen.getByRole('presentation'), mockData());
    });
    expect(store.getState().file.key).toBe(uuid);
  });

  it('rejects if there are too many files', async () => {
    renderWithProviders(<Dropzone />);
    await act(() => {
      fireEvent.drop(screen.getByRole('presentation'), mockData(mockFiles(2)));
    });
    expect(store.getState().file.key).toBe(undefined);
  });
});
