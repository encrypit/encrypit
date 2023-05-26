import { act } from '@testing-library/react';
import type { Root } from 'react-dom/client';

let getElementByIdSpy: jest.SpyInstance;
let root: Root;

beforeAll(() => {
  const div: HTMLDivElement = document.createElement('div');
  getElementByIdSpy = jest
    .spyOn(document, 'getElementById')
    .mockReturnValueOnce(div);
});

afterAll(() => {
  jest.restoreAllMocks();
});

it('renders without crashing', () => {
  expect(getElementByIdSpy).not.toBeCalled();
  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    root = require('.').root;
  });
  expect(getElementByIdSpy).toBeCalledTimes(1);
  expect(getElementByIdSpy).toBeCalledWith('root');
  act(() => {
    root.unmount();
  });
});
