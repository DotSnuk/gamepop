const BASE_PRICE = 30;
const GOG_REDUCTION = 10;
const GOG_STORE_ID = 5;
const PLAYSTATION_MULTIPLIER = 2;
const PLAYSTATION_PLATFORM_ID = 187;
const INDIE_MULTIPLIER = 0.5;
const INDIE_ID = 51;

export function calculatePrice(game) {
  let total = BASE_PRICE;
  onPlaystation(game) && (total = total * PLAYSTATION_MULTIPLIER);
  isIndie(game) && (total = total * INDIE_MULTIPLIER);
  onGog(game) && (total = total - GOG_REDUCTION);
  return total + priceTweak();
}

function onGog(game) {
  if (Array.isArray(game.stores)) {
    return game.stores.find(store => store.store.id === GOG_STORE_ID);
  }
  return false;
}

function onPlaystation(game) {
  if (Array.isArray(game.platforms)) {
    return game.platforms.find(
      platform => platform.platform.id === PLAYSTATION_PLATFORM_ID,
    );
  }
  return false;
}

function isIndie(game) {
  if (Array.isArray(game.genres)) {
    return game.genres.find(genre => genre.id === INDIE_ID);
  }
  return false;
}

function priceTweak() {
  if (subtractionRandomizer()) return 0 - getRandomInt(4);
  return getRandomInt(4);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function subtractionRandomizer() {
  return Math.random() < 0.5;
}
