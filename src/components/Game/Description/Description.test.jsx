import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Description from './Description';

it('display text supplied', () => {
  const text = 'This is a game';
  render(<Description text={text} />);

  expect(screen.getByText(text)).toBeInTheDocument();
});
