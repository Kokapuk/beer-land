import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.scss';
import Home from './pages/Home';
import RecipeType from './pages/Recipe';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/recipe/:id',
    element: <RecipeType />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
