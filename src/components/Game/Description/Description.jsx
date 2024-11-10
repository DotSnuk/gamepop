import parse from 'html-react-parser';

export default function Description({ text }) {
  return <div>{parse(text)}</div>;
}
