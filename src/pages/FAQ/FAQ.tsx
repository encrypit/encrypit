import faq from 'docs/faq.md?raw';
import Markdown from 'src/components/Markdown';
import { APP_NAME } from 'src/config';
import { useSetDocumentTitle } from 'src/hooks';

export default function FAQ() {
  useSetDocumentTitle(`${APP_NAME} FAQ`);
  return <Markdown>{faq}</Markdown>;
}
