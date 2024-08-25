import React, { Suspense, lazy } from 'react';

const isMobileDevice = (): boolean => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

const DesktopApp = lazy(() => import('./DesktopApp'));
const MobileApp = lazy(() => import('./MobileApp'));

const App: React.FC = () => {
  const isMobile = isMobileDevice();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isMobile ? <MobileApp /> : <DesktopApp />}
    </Suspense>
  );
};

export default App;
