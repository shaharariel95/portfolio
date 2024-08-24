import React from 'react';
import './AppIcon.css';

interface AppIconProps {
  icon: string;
  label: string;
  onClick?: () => void;  // Added onClick prop as optional
}

const AppIcon: React.FC<AppIconProps> = ({ icon, label, onClick }) => {
  return (
    <div className="app-icon" onClick={onClick}>
      <img src={icon} alt={`${label} icon`} />
      <span>{label}</span>
    </div>
  );
};

export default AppIcon;
