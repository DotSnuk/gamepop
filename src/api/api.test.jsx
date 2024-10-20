import { describe, it, expect, vi } from 'vitest';
import { getPopularGames, getGameWithId } from './api';

it('get 12 games', async () => {
  const games = await getPopularGames();

  expect(games).toHaveLength(12);
});

it('get grand theft auto v from search', async () => {
  const game = await getGameWithId('grand-theft-auto-v');

  expect(game.name).not.toBe(null);
});

it('wrong id gets error', async () => {
  await expect(getGameWithId('####31d')).rejects.toThrowError(/server error/i);
});
