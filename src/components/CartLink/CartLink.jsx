import { ShoppingCart } from 'lucide-react';
import PropTypes from 'prop-types';
import { useCartContext } from '../../app/App';

export default function CartLink() {
  const { cart, openCart } = useCartContext();
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
