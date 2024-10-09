import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useState, useReducer } from 'react';

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

function cartReducer(cart, action) {}
