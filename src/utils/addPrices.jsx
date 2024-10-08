import { calculatePrice } from './calculatePrice';

export function addPrices(games) {
  return games.map(game => {
    return { ...game, price: calculatePrice(game) };
  });
}
