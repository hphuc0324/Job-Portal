import { Outlet } from 'react-router-dom';
import Navbar from '../navbar';

function DefaultLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
