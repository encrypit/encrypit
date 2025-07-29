import { type LoaderFunctionArgs, redirect } from 'react-router-dom';

import { fileKeyLoader } from './fileKeyLoader';

jest.mock('react-router-dom', () => ({
  redirect: jest.fn(),
}));

const mockedRedirect = jest.mocked(redirect);

beforeEach(() => {
  jest.clearAllMocks();
});

it.each(['123456789', 'abcdefghi', 'ABCDEFGHI', 'Abc456-89', '0bc_56789'])(
  'does not redirect to /404 when params.fileKey is %p',
  (fileKey) => {
    fileKeyLoader({ params: { fileKey } } as unknown as LoaderFunctionArgs);
    expect(mockedRedirect).not.toHaveBeenCalled();
  },
);

it.each(['123456', '1234567890', '123456#'])(
  'redirects to /404 when params.fileKey is %p',
  (fileKey) => {
    fileKeyLoader({ params: { fileKey } } as unknown as LoaderFunctionArgs);
    expect(mockedRedirect).toHaveBeenCalledTimes(1);
    expect(mockedRedirect).toHaveBeenCalledWith('/404');
  },
);
