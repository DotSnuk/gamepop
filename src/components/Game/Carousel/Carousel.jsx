import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { getScreenshots } from '../../../api/api';
import { LoaderCircle } from 'lucide-react';
import styles from './Carousel.module.css';
import placeholder from '../../../assets/placeholder_1920x1080.png';

export default function Carousel() {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const images = useRef([]);
  const imagesLoaded = useRef(0);

  useEffect(() => {
    async function handleGetScreenshots(id) {
      await getScreenshots(id).then(imgs => (images.current = imgs));
      setCurrentId(images.current[0].id);
    }
    handleGetScreenshots(id);
  }, [id]);

  const increaseImagesLoaded = () => {
    imagesLoaded.current = imagesLoaded.current + 1;
    areAllImagesLoaded();
  };

  const areAllImagesLoaded = () => {
    imagesLoaded.current === images.current.length && setLoaded(true);
  };

  const getCurrentImage = () => {
    return images.current.filter(imgs => imgs.id === currentId);
  };

  return (
    <div className={styles.container}>
      <ImageMain image={getCurrentImage(currentId)} loaded={loaded} />
      <ImageRow
        images={images.current}
        increaseImagesLoaded={increaseImagesLoaded}
        setCurrentId={setCurrentId}
        loaded={loaded}
      />
    </div>
  );
}

function ImageMain({ image, loaded }) {
  if (image.length > 0) {
    const img = (
      <>
        <img
          src={image[0].image}
          alt='main'
          style={{ display: loaded ? 'block' : 'none' }}
        />
        <LoaderCircleWithClass loaded={loaded} />
      </>
    );
    return <div className={styles.main}>{img}</div>;
  }
  return <LoaderCircleWithClass loaded={loaded} />;
}

function ImageRow({ images, increaseImagesLoaded, loaded, setCurrentId }) {
  const imgs = images.map(img => (
    <div key={img.id} className={styles.rowItem}>
      <img
        src={img.image}
        alt='row'
        onLoad={() => increaseImagesLoaded()}
        onClick={() => setCurrentId(img.id)}
        style={{ display: loaded ? 'block' : 'none' }}
      />
      <LoaderCircleWithClass loaded={loaded} />
    </div>
  ));

  return <div className={styles.row}>{imgs}</div>;
}

function LoaderCircleWithClass({ loaded }) {
  return (
    <LoaderCircle
      style={{ display: loaded ? 'none' : 'block' }}
      role='img'
      alt='loading'
      className={styles.spinning}
    />
  );
}

// function getImageRowGridStyle(screenshotAmount) {
//   const style = {
//     display: 'grid',
//     gridTemplateColumns: `repeat(${screenshotAmount}, 240px)`,
//     overflowY: 'hidden',
//     overflowX: 'auto',
//   };
//   return style;
// }
