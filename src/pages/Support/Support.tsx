import support from 'docs/support.md?raw';
import Markdown from 'src/components/Markdown';
import { APP_NAME } from 'src/config';
import { useSetDocumentTitle } from 'src/hooks';

export default function Support() {
  useSetDocumentTitle(`${APP_NAME} Support`);
  return <Markdown>{support}</Markdown>;
}
