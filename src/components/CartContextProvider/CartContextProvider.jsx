import { useContext, createContext, useReducer, act } from 'react';
import { ACTIONS } from '../../assets/constants';

export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  console.log(cart);

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
    case ACTIONS.ADDGAME: {
      if (!cart.some(item => item.game.id === action.payload.game.id))
        return [...cart, addGame(action.payload)];
      return cart;
    }
    case ACTIONS.REMOVEGAME: {
      return cart.filter(item => item.game.id !== action.payload.game.game.id);
    }
    case ACTIONS.CHANGEAMOUNT: {
      return cart.map(item => {
        if (item.game.id === action.payload.game.game.id)
          return changeAmount(action.payload);
        return item;
      });
    }
    case ACTIONS.INCREMENT: {
      return cart.map(item => {
        if (item.game.id === action.payload.game.game.id)
          return incrementAmount(action.payload);
        return item;
      });
    }
    case ACTIONS.DECREMENT: {
      return cart.map(item => {
        if (item.game.id === action.payload.game.game.id)
          return decrementAmount(action.payload);
        return item;
      });
    }
    default:
      console.log('wrong action');
  }
}

function addGame(payload) {
  const { game } = payload;

  return { game: game, amount: 1 };
}

function changeAmount(payload) {
  const { game, newAmount } = payload;
  return { ...game, amount: newAmount };
}

function incrementAmount(payload) {
  const { game } = payload;
  const previousAmount = parseInt(game.amount);
  return { ...game, amount: previousAmount + 1 };
}

function decrementAmount(payload) {
  const { game } = payload;
  const previousAmount = parseInt(game.amount);
  const newAmount = previousAmount - 1 >= 1 ? previousAmount - 1 : 1;
  return { ...game, amount: newAmount };
}
