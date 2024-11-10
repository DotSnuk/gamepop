import { describe, it, expect, vi } from 'vitest';
import { getPopularGames, getGameWithId, getScreenshots } from './api';
import { array } from 'prop-types';

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

it('get array of screenshots', async () => {
  const screenshots = await getScreenshots('grand-theft-auto-v');
  expect(Array.isArray(screenshots)).toBeTruthy();
  const regTest = /jpeg$|jpg$|png$|/;
  // could use string method endsWith but wanted to learn regex
  expect(screenshots.some(screenshot => regTest.test(screenshot))).toBeTruthy();
});
