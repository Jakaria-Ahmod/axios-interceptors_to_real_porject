import { createBrowserRouter, RouterProvider } from 'react-router';
import Rootcomponents from './RooComponents';
import AllUser from './components/AllUser';
import Home from './components/Home';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Rootcomponents></Rootcomponents>,
      children: [
        {
          path: '/',
          element: <Home></Home>,
        },
        {
          path: '/login',
          element: <div>login</div>,
        },
        {
          path: '/user',
          element: <AllUser></AllUser>,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      {/* <div>App</div> */}
    </>
  );
};

export default App;
