import { act, fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from 'test/helpers';

import Dropzone from './Dropzone';

it('renders Dropzone', () => {
  renderWithProviders(<Dropzone />);
  expect(
    screen.getByRole('button', { name: /Drag & drop your file here/ })
  ).toBeInTheDocument();
});

it.each(['click', 'focus', 'blur'] as const)(
  'fires events %s on Dropzone',
  async (eventName) => {
    renderWithProviders(<Dropzone />);
    await act(() => {
      const rootElement = screen.getByRole('presentation');
      fireEvent[eventName](rootElement);
    });
    expect(screen.getByText(/Drag & drop your file here/)).toBeInTheDocument();
  }
);

it('drags file to Dropzone', async () => {
  const file = new File([JSON.stringify({ ping: true })], 'ping.json', {
    type: 'application/json',
  });
  const data = mockData([file]);

  renderWithProviders(<Dropzone />);

  await act(() => {
    const rootElement = screen.getByRole('presentation');
    fireEvent.dragEnter(rootElement, data);
  });

  expect(
    screen.getByRole('button', { name: /Drop your file here/ })
  ).toBeInTheDocument();
});

it('drops file to Dropzone', async () => {
  const file = new File([JSON.stringify({ ping: true })], 'ping.json', {
    type: 'application/json',
  });
  const data = mockData([file]);

  renderWithProviders(<Dropzone />);
  const spy = jest.spyOn(console, 'log').mockImplementation();

  await act(() => {
    fireEvent.drop(screen.getByRole('presentation'), data);
  });

  expect(spy).toBeCalled();
  spy.mockRestore();
});

function mockData(files: File[]) {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file,
      })),
      types: ['Files'],
    },
  };
}
