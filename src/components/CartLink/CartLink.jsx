import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartLink() {
  return (
    <nav>
      <Link aria-label='cart'>
        <ShoppingCart />
      </Link>
    </nav>
  );
}
