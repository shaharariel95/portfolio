import React from 'react';
import './MobileWarningPopup.css';

const MobileWarningPopup: React.FC = () => {
  return (
    <div className="mobile-warning-popup">
      <div className="mobile-warning-content">
        <h2>Desktop View Recommended</h2>
        <p>This site is built for desktop view. you are viewing a single section of it.</p>
        <button onClick={() => document.querySelector('.mobile-warning-popup')?.classList.add('hidden')}>
          Continue Anyway
        </button>
      </div>
    </div>
  );
};

export default MobileWarningPopup;
