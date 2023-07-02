import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Markdown, { type MarkdownToJSX } from 'markdown-to-jsx';
import { APP_NAME } from 'src/config';
import { useSetDocumentTitle } from 'src/hooks';

import privacy from './privacy.md?raw';

const options: MarkdownToJSX.Options = {
  overrides: {
    h1: {
      component: (props) => <Typography gutterBottom variant="h4" {...props} />,
    },
    h2: {
      component: /* istanbul ignore next */ (props) => (
        <Typography
          gutterBottom
          sx={{ fontWeight: 'bold' }}
          variant="h5"
          {...props}
        />
      ),
    },
    p: {
      component: /* istanbul ignore next */ (props) => (
        <Typography paragraph {...props} />
      ),
    },
    a: {
      component: /* istanbul ignore next */ (props) => <Link {...props} />,
    },
  },
};

export default function Privacy() {
  useSetDocumentTitle(`${APP_NAME} Privacy Policy`);
  return <Markdown options={options}>{privacy}</Markdown>;
}
