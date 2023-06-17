import { type LoaderFunction, redirect } from 'react-router-dom';
import { FILE_KEY_REGEX } from 'shared/constants';

export const fileKeyLoader: LoaderFunction = ({ params }) => {
  if (!FILE_KEY_REGEX.test(params.fileKey!)) {
    return redirect('/404');
  }
  return null;
};
