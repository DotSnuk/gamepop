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
                  dispatch({ type: ACTIONS.ADDGAME, payload: { game: game } })
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
                      aria-label='decrement'
                      value={'-'}
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.DECREMENT,
                          payload: { game: item },
                        })
                      }
                    />
                    <input
                      type='button'
                      aria-label='increment'
                      value={'+'}
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.INCREMENT,
                          payload: { game: item },
                        })
                      }
                    />
                    <input
                      type='number'
                      aria-label='amount'
                      value={item.amount}
                      onChange={e =>
                        dispatch({
                          type: ACTIONS.CHANGEAMOUNT,
                          payload: { game: item, newAmount: e.target.value },
                        })
                      }
                    />
                    <input
                      type='button'
                      aria-label={`remove ${item.game.name}`}
                      value={'remove'}
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.REMOVEGAME,
                          payload: { game: item },
                        })
                      }
                    />
                    <input
                      type='text'
                      aria-label='cost'
                      value={item.game.price * item.amount}
                      readOnly
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

it('clicking increment/decrement button changes amount', async () => {
  const user = userEvent.setup();
  render(
    <CartContextProvider>
      <CustomTestComponent />
    </CartContextProvider>,
  );

  const gtaButton = screen.getByDisplayValue(/buy gta/i);
  await user.click(gtaButton);

  const incrementButton = screen.getByRole('button', { name: 'increment' });
  await user.click(incrementButton);

  expect(screen.getByRole('spinbutton', { name: 'amount' })).toHaveValue(2);
  await user.click(incrementButton);

  expect(screen.getByRole('spinbutton', { name: 'amount' })).toHaveValue(3);

  const decrementButton = screen.getByRole('button', { name: 'decrement' });
  await user.click(decrementButton);

  expect(screen.getByRole('spinbutton', { name: 'amount' })).toHaveValue(2);
});

it('user changing value directly in amount', async () => {
  const user = userEvent.setup();
  render(
    <CartContextProvider>
      <CustomTestComponent />
    </CartContextProvider>,
  );

  const gtaButton = screen.getByDisplayValue(/buy gta/i);
  await user.click(gtaButton);

  const amountInput = screen.getByRole('spinbutton', { name: 'amount' });
  await user.type(amountInput, '{backspace}4');
  expect(amountInput).toHaveValue(4);
  expect(screen.getByRole('textbox', { name: 'cost' })).toHaveValue('300');
});

it('decrement doesnt go below 1', async () => {
  const user = userEvent.setup();
  render(
    <CartContextProvider>
      <CustomTestComponent />
    </CartContextProvider>,
  );

  const gtaButton = screen.getByDisplayValue(/buy gta/i);
  await user.click(gtaButton);

  const decrementButton = screen.getByRole('button', { name: 'decrement' });
  await user.click(decrementButton);

  expect(screen.getByRole('spinbutton', { name: 'amount' })).toHaveValue(1);
  await user.click(decrementButton);
  await user.click(decrementButton);
  expect(screen.getByRole('spinbutton', { name: 'amount' })).toHaveValue(1);
  expect(screen.getByRole('textbox', { name: 'cost' })).toHaveValue('75');
});

it('cant add game with same id more than once', async () => {
  const user = userEvent.setup();
  render(
    <CartContextProvider>
      <CustomTestComponent />
    </CartContextProvider>,
  );

  const gtaButton = screen.getByDisplayValue(/buy gta/i);
  await user.click(gtaButton);
  await user.click(gtaButton);

  const headings = screen.getAllByRole('heading', { level: 2 });
  const gtaHead = headings.filter(head => head.textContent.match(/gta/i));
  expect(gtaHead.length).toBe(1);
});

it('clicking remove game removes it from cart', async () => {
  const user = userEvent.setup();
  render(
    <CartContextProvider>
      <CustomTestComponent />
    </CartContextProvider>,
  );

  const gtaButton = screen.getByDisplayValue(/buy gta/i);
  const factorioButton = screen.getByDisplayValue(/buy factorio/i);
  await user.click(gtaButton);
  await user.click(factorioButton);

  let games = screen.getAllByRole('heading', { level: 2 });
  expect(games.length).toBe(2);

  const removeGtaButton = screen.getByRole('button', { name: 'remove gta' });
  await user.click(removeGtaButton);

  games = screen.getAllByRole('heading', { level: 2 });
  expect(games.length).toBe(1);
  expect(games.some(heading => heading.textContent.match(/gta/i))).toBeFalsy();

  const removeFactorioButton = screen.getByRole('button', {
    name: 'remove factorio',
  });
  await user.click(removeFactorioButton);

  expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
});
