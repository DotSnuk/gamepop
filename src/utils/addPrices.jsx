import { calculatePrice } from './calculatePrice';

export function addPrices(games) {
  if (Array.isArray(games))
    return games.map(game => {
      return { ...game, price: calculatePrice(game) };
    });
  return { ...games, price: calculatePrice(games) };
  // if array?
}
