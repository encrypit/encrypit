import { Outlet } from 'react-router-dom';
import Container from 'src/components/Container';

import Header from '../Header';

export default function Layout() {
  return (
    <>
      <Header />
      <Container component="main">
        <br />
        <Outlet />
      </Container>
    </>
  );
}
