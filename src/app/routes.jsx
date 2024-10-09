import App from './App';
import Home from '../components/Home/Home';

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
    ],
  },
];
