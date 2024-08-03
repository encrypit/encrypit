import { act } from '@testing-library/react';

afterAll(() => {
  jest.restoreAllMocks();
});

it('renders without crashing', () => {
  const getElementByIdSpy = jest
    .spyOn(document, 'getElementById')
    .mockReturnValueOnce(document.createElement('div'));

  act(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { root } = require('.');
    root.unmount();
  });

  expect(getElementByIdSpy).toBeCalledTimes(1);
  expect(getElementByIdSpy).toBeCalledWith('root');
});
