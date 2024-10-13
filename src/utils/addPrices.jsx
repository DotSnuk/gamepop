import { calculatePrice } from './calculatePrice';

export function addPrices(games) {
  // if array?
  return games.map(game => {
    return { ...game, price: calculatePrice(game) };
  });
}
