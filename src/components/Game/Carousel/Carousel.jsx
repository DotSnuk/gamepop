import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import { getScreenshots, getGameWithId } from '../../../api/api';
import { LoaderCircle } from 'lucide-react';
import styles from './Carousel.module.css';
import placeholder from '../../../assets/placeholder_1920x1080.png';

export default function Carousel() {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const timerReset = useInterval(getNextImage, 10000);
  const images = useRef([]);
  const imagesLoaded = useRef(0);

  useEffect(() => {
    async function fetchImages(id) {
      const tempImage = [];
      const background = await getGameWithId(id).then(obj => {
        return { id: 'background', image: obj.background_image };
      });
      if (background?.image) {
        tempImage.push(background);
      }

      const screenshots = await getScreenshots(id);
      if (screenshots.length > 0) tempImage.push(...screenshots);
      images.current = tempImage;
      setCurrentId(images.current[0].id);
    }
    fetchImages(id);
  }, [id]);

  function getNextImage() {
    const index = images.current.findIndex(img => img.id === currentId);
    if (index !== -1) {
      if (index + 1 < images.current.length) {
        setCurrentId(images.current[index + 1].id);
        return;
      }
      setCurrentId(images.current[0].id);
    }
  }

  function increaseImagesLoaded() {
    imagesLoaded.current = imagesLoaded.current + 1;
    areAllImagesLoaded();
  }

  function areAllImagesLoaded() {
    imagesLoaded.current === images.current.length && setLoaded(true);
  }

  function getCurrentImage() {
    return images.current.filter(imgs => imgs.id === currentId);
  }

  function handleClick(id) {
    setCurrentId(id);
    timerReset();
  }

  return (
    <div className={styles.container}>
      <ImageMain image={getCurrentImage(currentId)} loaded={loaded} />
      <ImageRow
        images={images.current}
        increaseImagesLoaded={increaseImagesLoaded}
        handleClick={handleClick}
        setCurrentId={setCurrentId}
        loaded={loaded}
      />
    </div>
  );
}

function useInterval(callback, delay) {
  const timerRef = useRef(null);
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    timerRef.current = setInterval(() => callbackRef.current(), delay);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [delay]);

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => callbackRef.current(), delay);
  }, [delay]);

  return reset;
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
  return (
    <div className={styles.main}>
      <LoaderCircleWithClass loaded={loaded} />
    </div>
  );
}

function ImageRow({ images, increaseImagesLoaded, loaded, handleClick }) {
  const imgs = images.map(img => (
    <div key={img.id} className={styles.rowItem}>
      <img
        src={img.image}
        alt='row'
        onLoad={() => increaseImagesLoaded()}
        onClick={() => handleClick(img.id)}
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
