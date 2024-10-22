import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useContext, createContext, useReducer, useRef } from 'react';
import CartModal from '../components/CartModal/CartModal';
import { ACTIONS } from '../assets/constants';

export const CartContext = createContext(null);

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const dialogRef = useRef(null);

  const openCart = () => dialogRef.current?.showModal();
  const closeCart = () => dialogRef.current?.close();

  return (
    <>
      <CartContext.Provider value={{ dispatch, cart }}>
        <Header openCart={openCart} cart={cart} />
        <main>
          <dialog ref={dialogRef} onCancel={closeCart}>
            <CartModal cart={cart} />
            <button onClick={closeCart}>close</button>
          </dialog>
          <Outlet context={[cart]} />
        </main>
      </CartContext.Provider>
    </>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}

function addGame(game) {
  return { game: game, amount: 1 };
}

function cartReducer(cart, action) {
  if (action.type === ACTIONS.ADDGAME) {
    return [...cart, addGame(action.payload.game)];
  }
}
