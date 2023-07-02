import { render, screen } from '@testing-library/react';

import Markdown from './Markdown';

it('renders heading 1', () => {
  render(<Markdown># h1</Markdown>);
  expect(
    screen.getByRole('heading', { level: 1, name: 'h1' })
  ).toBeInTheDocument();
});

it('renders heading 2', () => {
  render(<Markdown>## h2</Markdown>);
  expect(
    screen.getByRole('heading', { level: 2, name: 'h2' })
  ).toBeInTheDocument();
});

it('renders paragraph', () => {
  render(
    <Markdown>{`
Paragraph
`}</Markdown>
  );
  const element = screen.getByText('Paragraph');
  expect(element.tagName).toBe('P');
});

it('renders link', () => {
  render(<Markdown>[link](#link)</Markdown>);
  expect(screen.getByRole('link', { name: 'link' })).toHaveAttribute(
    'href',
    '#link'
  );
});
