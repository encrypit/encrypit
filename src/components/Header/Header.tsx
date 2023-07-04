import GitHubIcon from '@mui/icons-material/GitHub';
import HelpIcon from '@mui/icons-material/Help';
import SecurityIcon from '@mui/icons-material/Security';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink } from 'react-router-dom';
import Container from 'src/components/Container';

export default function Header() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters sx={{ flexGrow: 1 }}>
          {/* flexGrow is on Box so Link does not take full width */}
          <Box sx={{ flexGrow: 1 }}>
            <Link
              color="inherit"
              component={RouterLink}
              replace
              to="/"
              underline="hover"
              variant="h6"
            >
              Encrypit
            </Link>
          </Box>

          <IconButton
            aria-label="Support"
            color="inherit"
            component={RouterLink}
            title="Support"
            to="/support"
          >
            <HelpIcon />
          </IconButton>

          <IconButton
            aria-label="Privacy"
            color="inherit"
            component={RouterLink}
            to="/privacy"
            title="Privacy"
          >
            <SecurityIcon />
          </IconButton>

          <Link
            aria-label="GitHub"
            color="inherit"
            component={IconButton}
            href="https://github.com/encrypit/encrypit"
            target="_blank"
            title="GitHub"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
