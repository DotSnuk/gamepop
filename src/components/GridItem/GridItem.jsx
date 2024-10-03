import PropTypes from 'prop-types';

export default function GridItem({ game }) {
  return (
    <div className='container'>
      <img src={game.background_image} />
      <h2 className='name'>{game.name}</h2>
    </div>
  );
}

GridItem.propTypes = {
  game: PropTypes.object,
};
