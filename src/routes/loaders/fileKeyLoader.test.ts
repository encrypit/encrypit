import { type LoaderFunctionArgs, redirect } from 'react-router-dom';

import { fileKeyLoader } from './fileKeyLoader';

jest.mock('react-router-dom', () => ({
  redirect: jest.fn(),
}));

const mockedRedirect = jest.mocked(redirect);

beforeEach(() => {
  jest.clearAllMocks();
});

it.each(['1234567', 'abcdefg', 'ABCDEFG', 'Abc456-', '0bc_789'])(
  'does not redirect to /404 when params.fileKey is %p',
  (fileKey) => {
    fileKeyLoader({ params: { fileKey } } as unknown as LoaderFunctionArgs);
    expect(mockedRedirect).not.toBeCalled();
  },
);

it.each(['123456', '12345678', '123456#'])(
  'redirects to /404 when params.fileKey is %p',
  (fileKey) => {
    fileKeyLoader({ params: { fileKey } } as unknown as LoaderFunctionArgs);
    expect(mockedRedirect).toBeCalledTimes(1);
    expect(mockedRedirect).toBeCalledWith('/404');
  },
);
