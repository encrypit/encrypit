import Markdown from 'src/components/Markdown';
import { APP_NAME } from 'src/config';
import { useSetDocumentTitle } from 'src/hooks';

import privacy from './privacy.md?raw';

export default function Privacy() {
  useSetDocumentTitle(`${APP_NAME} Privacy Policy`);
  return <Markdown>{privacy}</Markdown>;
}
