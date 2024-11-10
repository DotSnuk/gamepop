import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { getScreenshots } from '../../../api/api';
import placeholder from '../../../assets/placeholder_1920x1080.png';

export default function Carousel() {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const images = useRef([]);

  useEffect(() => {
    async function handleGetScreenshots(id) {
      await getScreenshots(id).then(imgs => (images.current = imgs));
      setLoaded(true);
    }
    handleGetScreenshots(id);
  }, [id]);

  if (!loaded) {
    return (
      <div>
        <ImageMain img={placeholder} />
        <ImageRow />
      </div>
    );
  }

  return (
    <div>
      <ImageMain img={images.current[currentIndex]} />
      <ImageRow />
    </div>
  );
}

function ImageMain({ img }) {
  return (
    <div>
      <img src={img} alt='main' />
    </div>
  );
}

function ImageRow() {}
