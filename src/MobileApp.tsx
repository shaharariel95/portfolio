import React from 'react';
import VSCodeWindow from './VSCodeWindow';
import MobileWarningPopup from './MobileWarningPopup';

const MobileApp: React.FC = () => {
  return (
    <div>
      <MobileWarningPopup />
      <div className="mobile-view">
        <VSCodeWindow />
      </div>
    </div>
  );
};

export default MobileApp;
