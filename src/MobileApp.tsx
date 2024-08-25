import React from 'react';
import MobileWarningPopup from './MobileWarningPopup';
import Browser from './Browser';

const MobileApp: React.FC = () => {
  return (
    <div>
      <MobileWarningPopup />
      <div className="mobile-view">
        <Browser />
      </div>
    </div>
  );
};

export default MobileApp;
