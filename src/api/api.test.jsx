import { describe, it, expect, vi } from 'vitest';
import { getPopularGames } from './api';

it('get 10 games', async () => {
  const games = await getPopularGames();

  expect(games).toHaveLength(10);
});
