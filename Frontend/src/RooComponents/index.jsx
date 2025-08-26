// import { Outlet } from 'react-router'; //
import { Outlet } from 'react-router';
import Header from '../commonLayout';

const Rootcomponents = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Rootcomponents;
