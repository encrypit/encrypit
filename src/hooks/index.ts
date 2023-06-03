import { fileApi } from '../store/api';

export const {
  useDeleteFileMutation,
  useDownloadFileQuery,
  useUploadFileMutation,
} = fileApi;

export * from './useDispatch';
export * from './useSelector';
export * from './useSetDocumentTitle';
