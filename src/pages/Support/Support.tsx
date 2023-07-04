import Markdown from 'src/components/Markdown';
import { APP_NAME } from 'src/config';

import { useSetDocumentTitle } from '../../hooks';
import support from './support.md?raw';

export default function Support() {
  useSetDocumentTitle(`${APP_NAME} Support`);
  return <Markdown>{support}</Markdown>;
}
