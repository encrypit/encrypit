import MarkdownToJSX from 'markdown-to-jsx';

import { options } from './options';

interface Props {
  children: string;
}

export default function Markdown(props: Props) {
  return <MarkdownToJSX options={options} {...props} />;
}
