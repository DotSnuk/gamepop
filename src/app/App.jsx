import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useState, useReducer, useRef } from 'react';
import CartModal from '../components/CartModal/CartModal';
import { ACTIONS } from '../assets/constants';

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const dialogRef = useRef(null);

  const openCart = () => dialogRef.current?.showModal();
  const closeCart = () => dialogRef.current?.close();

  return (
    <>
      <Header openCart={openCart} cart={cart} />
      <main>
        <dialog ref={dialogRef} onCancel={closeCart}>
          <CartModal cart={cart} />
          <button onClick={closeCart}>close</button>
        </dialog>
        <Outlet context={[dispatch]} />
      </main>
    </>
  );
}

function addGame(game) {
  return { game: game, amount: 1 };
}

function cartReducer(cart, action) {
  if (action.type === ACTIONS.ADDGAME) {
    return [...cart, addGame(action.payload.game)];
  }
}
