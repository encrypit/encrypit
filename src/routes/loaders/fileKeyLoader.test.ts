import { type LoaderFunctionArgs, redirect } from 'react-router-dom';
import { FILE } from 'shared/constants';

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

const random = (length: number) => String(Date.now()).slice(0, length);

it.each([random(FILE.KEY_LENGTH - 1), random(FILE.KEY_LENGTH + 1), '1234567#'])(
  'redirects to /404 when params.fileKey is %p',
  (fileKey) => {
    fileKeyLoader({ params: { fileKey } } as unknown as LoaderFunctionArgs);
    expect(mockedRedirect).toHaveBeenCalledTimes(1);
    expect(mockedRedirect).toHaveBeenCalledWith('/404');
  },
);
