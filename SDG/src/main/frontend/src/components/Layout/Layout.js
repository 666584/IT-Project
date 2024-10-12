import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.js';

function Layout() {

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
         <Outlet />
      </div>
    </div>
  );
}

export default Layout;