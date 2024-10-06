import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}