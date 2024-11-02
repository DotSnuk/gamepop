import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useRef } from 'react';
import CartContextProvider from '../components/CartContextProvider/CartContextProvider';
import CartModal from '../components/CartModal/CartModal';

export default function App() {
  const dialogRef = useRef(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  return (
    <>
      <CartContextProvider>
        <Header openModal={openModal} />
        <main onClick={closeModal}>
          <dialog ref={dialogRef} onCancel={closeModal}>
            <CartModal closeModal={closeModal} />
          </dialog>
          <Outlet />
        </main>
      </CartContextProvider>
    </>
  );
}
