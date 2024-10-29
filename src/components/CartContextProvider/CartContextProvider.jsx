import { useContext, createContext, useReducer, act } from 'react';
import { ACTIONS } from '../../assets/constants';

export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ dispatch, cart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) throw new Error('context used outside CartContextProvider');
  return context;
}

function cartReducer(cart, action) {
  switch (action.type) {
    case ACTIONS.ADDGAME:
      return [...cart, addGame(action.payload)];
    case ACTIONS.CHANGEAMOUNT: {
      return cart.map(item => {
        if (item.game.id === action.payload.game.id)
          return changeAmount(action.payload);
        return item;
      });
    }
    case ACTIONS.INCREMENT: {
      return cart.map(item => {
        if (item.game.id === action.payload.game.id)
          return incrementAmount(action.payload);
        return item;
      });
    }
    case ACTIONS.DECREMENT: {
      return cart.map(item => {
        if (item.game.id === action.payload.game.id)
          return incrementAmount(action.payload);
        return item;
      });
    }
    default:
      console.log('wrong action');
  }
}

function addGame(game) {
  return { game: game, amount: 1 };
}

function changeAmount(game) {}

function incrementAmount(game) {
  const previousAmount = game.amount;
  return { ...game, amount: previousAmount + 1 };
}
