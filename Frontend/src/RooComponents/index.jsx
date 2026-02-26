import { Outlet } from 'react-router';
import Header from '../commonLayout/index';
import Footer from '../commonLayout/Footer';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header - fixed at top */}
      <Header />

      {/* Main content area - grows to fill space, handles padding for fixed header */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer - stays at bottom */}
      <Footer />
    </div>
  );
};

export default RootLayout;
