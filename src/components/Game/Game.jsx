import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getGameWithId } from '../../api/api';
import { addPrices } from '../../utils/addPrices';
import PurchaseBar from './PurchaseBar/PurchaseBar';
import styles from './Game.module.css';
import parse from 'html-react-parser';

export default function Game() {
  const [game, setGame] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    async function handleGetGame(id) {
      await getGameWithId(id).then(data => setGame(addPrices(data)));
    }
    handleGetGame(id);
  }, [id]);

  if (!game)
    return (
      <div className={styles.container}>
        <h2>loading...</h2>
      </div>
    );
  return (
    <div className={styles.container}>
      <section className={styles.content}>
        <h2>{game.name}</h2>
        <img src={game.background_image} />
        <PurchaseBar game={game} />
        <p>{parse(game.description)}</p>
      </section>
      <section className={styles.side}>
        <ul>
          <li>
            Developed by:{' '}
            {game.developers.map(dev => (
              <p key={dev.id}>{dev.name}</p>
            ))}
          </li>
        </ul>
      </section>
    </div>
  );
}
