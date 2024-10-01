import Navbar from '../components/NavBar/Navbar';
// import Home from '../components/Home/Home';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
