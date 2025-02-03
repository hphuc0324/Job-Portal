import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes } from './routes';

const router = createBrowserRouter(publicRoutes);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
