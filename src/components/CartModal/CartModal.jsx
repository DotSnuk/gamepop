import { useCartContext } from '../../app/App';

export default function CartModal() {
  const { cart } = useCartContext();
  if (cart.length === 0)
    return (
      <>
        <h1>Your cart is empty</h1>
      </>
    );
  return (
    <>
      <h1>Your cart</h1>
    </>
  );
}
