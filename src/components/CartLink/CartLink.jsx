import { ShoppingCart } from 'lucide-react';
import PropTypes from 'prop-types';

export default function CartLink({ openCart, cart }) {
  return (
    <nav>
      <button aria-label='cart' onClick={() => openCart()}>
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
