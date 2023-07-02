import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { MarkdownToJSX } from 'markdown-to-jsx';

export const options: MarkdownToJSX.Options = {
  overrides: {
    h1: {
      component: Heading1,
    },

    h2: {
      component: Heading2,
    },

    p: {
      component: Paragraph,
    },

    a: {
      component: Link,
    },
  },
};

function Heading1(props: object) {
  return <Typography component="h1" gutterBottom variant="h4" {...props} />;
}

function Heading2(props: object) {
  return (
    <Typography
      component="h2"
      gutterBottom
      sx={{ fontWeight: 'bold' }}
      variant="h5"
      {...props}
    />
  );
}

function Paragraph(props: object) {
  return <Typography paragraph {...props} />;
}
