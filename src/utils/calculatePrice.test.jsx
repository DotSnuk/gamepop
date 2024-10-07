import { it, expect, expectTypeOf, vi } from 'vitest';
import { calculatePrice } from './calculatePrice';
import { number } from 'prop-types';

it('get integer returned, game with none of the relevant stores', () => {
  const game = { name: 'gta' };

  expect(calculatePrice(game)).toBeTypeOf('number');
});

it('calculate price with store containing GOG', () => {
  const game = {
    name: 'not gta',
    id: 2,
    stores: [{ store: { id: 1 } }, { store: { id: 5 } }],
  };

  expect(calculatePrice(game)).toBeGreaterThanOrEqual(17);
  expect(calculatePrice(game)).toBeLessThanOrEqual(23);
});

it('calculate price with store containing playstation', () => {
  const game = {
    name: 'gta 7',
    id: 1,
    platforms: [{ platform: { id: 187, name: 'PlayStation 5' } }],
  };

  expect(calculatePrice(game)).toBeGreaterThanOrEqual(57);
  expect(calculatePrice(game)).toBeLessThanOrEqual(63);
});

it('calculate price with indie genre', () => {
  const game = {
    name: 'not gta',
    genres: [{ id: 51, name: 'Indie' }],
  };

  expect(calculatePrice(game)).toBeGreaterThanOrEqual(12);
  expect(calculatePrice(game)).toBeLessThanOrEqual(18);
});
