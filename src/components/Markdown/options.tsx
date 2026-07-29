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
  return (
    <Typography
      component="h1"
      sx={{ marginBottom: 2 }}
      variant="h4"
      {...props}
    />
  );
}

function Heading2(props: object) {
  return (
    <Typography
      component="h2"
      sx={{ fontWeight: 'bold', marginBottom: 1, marginTop: 4 }}
      variant="h5"
      {...props}
    />
  );
}

function Paragraph(props: object) {
  return <Typography component="p" sx={{ marginBottom: 2 }} {...props} />;
}
