import { renderWithProviders } from 'test/helpers';

import Layout from './Layout';

it('renders without crashing', () => {
  renderWithProviders(<Layout />);
});
