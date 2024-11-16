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
        <LoaderCircle style={{ display: loaded ? 'none' : 'block' }} />
      </>
    );
    return <div>{img}</div>;
  }
  return <LoaderCircle style={{ display: loaded ? 'none' : 'block' }} />;
}

function ImageRow({ images, increaseImagesLoaded, loaded }) {
  const imgs = images.map(img => (
    <>
      <img
        key={img.id}
        src={img.image}
        onLoad={() => increaseImagesLoaded()}
        style={{ display: loaded ? 'block' : 'none' }}
      />
      <LoaderCircle style={{ display: loaded ? 'none' : 'block' }} />
    </>
  ));

  return <div className={styles.row}>{imgs}</div>;
}
