import { fileApi } from '../store/api';

export const {
  useDeleteFileMutation,
  useUploadFileMutation,
  useLazyDownloadFileQuery,
} = fileApi;

export * from './useDispatch';
export * from './useSelector';
export * from './useSetDocumentTitle';
