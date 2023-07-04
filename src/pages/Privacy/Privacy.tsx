import privacy from 'docs/privacy.md?raw';
import Markdown from 'src/components/Markdown';
import { APP_NAME } from 'src/config';
import { useSetDocumentTitle } from 'src/hooks';

export default function Privacy() {
  useSetDocumentTitle(`${APP_NAME} Privacy Policy`);
  return <Markdown>{privacy}</Markdown>;
}
