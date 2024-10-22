import { Outlet } from 'react-router-dom';

function NoLayout({ children }) {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default NoLayout;
