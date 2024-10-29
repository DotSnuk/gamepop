import { it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartContextProvider, { useCartContext } from './CartContextProvider';
import { ACTIONS } from '../../assets/constants';

function getGames() {
  return [
    { name: 'gta', id: 1, price: 75 },
    { name: 'factorio', id: 2, price: 30 },
  ];
}

function CustomTestComponent() {
  const { cart, dispatch } = useCartContext();
  const games = getGames();

  return (
    <>
      <div>
        {games.map(game => {
          return (
            <div key={game.id}>
              <input
                type='button'
                aria-label='buy'
                value={'buy ' + game.name}
                onClick={() =>
                  dispatch({ type: ACTIONS.ADDGAME, payload: game })
                }
              />
            </div>
          );
        })}
      </div>
      <div>
        {cart.length === 0 ? (
          <div>Cart is empty</div>
        ) : (
          <div>
            <ul>
              {cart.map(item => {
                return (
                  <li key={item.game.id}>
                    <h2 aria-label='name'>{item.game.name}</h2>
                    <input
                      type='button'
                      value={'-'}
                      onClick={() =>
                        dispatch({ type: ACTIONS.DECREMENT, payload: item })
                      }
                    />
                    <input
                      type='button'
                      value={'+'}
                      onClick={() =>
                        dispatch({ type: ACTIONS.INCREMENT, payload: item })
                      }
                    />
                    <input
                      type='text'
                      value={item.amount}
                      onChange={e =>
                        dispatch({
                          type: ACTIONS.CHANGEAMOUNT,
                          payload: { item, newAmount: e.target.value },
                        })
                      }
                    />
                    <input
                      type='button'
                      value={'remove'}
                      onClick={() =>
                        dispatch({ type: ACTIONS.REMOVEGAME, payload: item })
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

it('shows empty cart', () => {
  render(
    <CartContextProvider>
      <CustomTestComponent />
    </CartContextProvider>,
  );

  expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
});

it('adding game shows game and cart is not empty', async () => {
  const user = userEvent.setup();
  render(
    <CartContextProvider>
      <CustomTestComponent />
    </CartContextProvider>,
  );

  expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();

  const gtaButton = screen.getByDisplayValue(/buy gta/i);
  await user.click(gtaButton);

  const headings = screen.getAllByRole('heading', { level: 2 });

  expect(headings.some(heading => heading.textContent.match(/gta/i)));

  expect(screen.queryByText(/cart is empty/i)).not.toBeInTheDocument();
});
