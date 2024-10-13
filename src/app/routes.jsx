import App from './App';
import Home from '../components/Home/Home';
import Game from '../components/Game/Game';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'game/:id',
        element: <Game />,
      },
    ],
  },
];
