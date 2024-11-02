import { ShoppingCart } from 'lucide-react';
import PropTypes from 'prop-types';
import { useCartContext } from '../CartContextProvider/CartContextProvider';
import InputWithIcon from '../InputWithIcon/InputWithIcon';

export default function CartLink({ openModal }) {
  const { cart } = useCartContext();
  // cart.length needs to later also apply the amount of games per game
  return (
    <nav>
      <InputWithIcon
        iconComponent={<ShoppingCart />}
        clickFunction={openModal}
        value={cart.length}
      />
    </nav>
  );
}

CartLink.propTypes = {
  openCart: PropTypes.func,
  cart: PropTypes.array,
};
