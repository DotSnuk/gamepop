import { ShoppingCart } from 'lucide-react';
import PropTypes from 'prop-types';
import { useCartContext } from '../CartContextProvider/CartContextProvider';

export default function CartLink({ openModal }) {
  const { cart } = useCartContext();
  // cart.length needs to later also apply the amount of games per game
  return (
    <nav>
      <button aria-label='cart' onClick={() => openModal()}>
        <ShoppingCart />
        {cart.length}
      </button>
    </nav>
  );
}

CartLink.propTypes = {
  openCart: PropTypes.func,
  cart: PropTypes.array,
};
