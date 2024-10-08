import { it, expect } from 'vitest';
import { addPrices } from './addPrices';

it('get games with price', () => {
  const games = [{ name: 'gta' }, { name: 'gta 2' }];
  expect(addPrices(games)[0]).toHaveProperty('price');
});
