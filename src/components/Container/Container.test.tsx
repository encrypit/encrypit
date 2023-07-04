import { render, screen } from '@testing-library/react';

import Container from './Container';

it('renders children', () => {
  const props = { children: 'children' };
  render(<Container {...props} />);
  expect(screen.getByText(props.children)).toBeInTheDocument();
});

it('sets component tag', () => {
  const props = {
    children: 'children',
    component: 'main',
  };
  render(<Container {...props} />);
  const element = screen.getByText(props.children);
  expect(element.tagName).toBe(props.component.toUpperCase());
});
