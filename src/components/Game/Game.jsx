import { useParams } from 'react-router-dom';

export default function Game() {
  const {
    id,
    name,
    description,
    released,
    background_image,
    background_image_additional,
  } = useParams();
  console.log(id);

  return (
    <>
      <h3>{id}</h3>
    </>
  );
}
