import React from 'react';
import './AppIcon.css'

interface AppIconProps {
  icon: string;
  label: string;
  onClick: () => void;
  isMinimized?: boolean;
}

const AppIcon: React.FC<AppIconProps> = ({ icon, label, onClick, isMinimized }) => {  
  return (
    <div className="app-icon-container" onClick={onClick}>
      <div className="app-icon">
        <img src={icon} alt={label} />
      </div>
      {isMinimized && <div className="minimized-indicator"></div>}
    </div>
  );
};

export default AppIcon;
