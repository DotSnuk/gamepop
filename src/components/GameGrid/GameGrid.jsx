import GridItem from '../GridItem/GridItem';

export default function GameGrid({ games }) {
  return games.map(game => <GridItem game={game} key={game.id} />);
}
