import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import './Desktop.css';
import AppIcon from './AppIcon';
import PdfReader from './PdfReader';
import VSCodeWindow from './VSCodeWindow';  // Import the new VSCodeWindow component
import browserIcon from './assets/browser-icon.svg';
import pdfIcon from './assets/pdf-icon.svg';
import vscodeIcon from './assets/vscode-icon.svg';
import wifiIcon from './assets/wifi-icon.svg';
import powerIcon from './assets/power-icon.svg';
import minimizeIcon from './assets/minimize-icon.svg';
import maximizeIcon from './assets/maximize-icon.svg';
import closeIcon from './assets/close-icon.svg';

const Desktop: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [windowSize, setWindowSize] = useState<{ width: number, height: number }>({ width: 600, height: 400 });
  const [windowPosition, setWindowPosition] = useState<{ x: number, y: number }>({ x: 100, y: 50 });

  const formatDate = (): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date().toLocaleDateString('en-US', options).replace(',', '');
  };

  const handlePowerClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setActiveApp(null);
  };

  const handleMaximize = () => {
    if (isMaximized) {
      setWindowSize({ width: 600, height: 400 });
      setWindowPosition({ x: 100, y: 50 });
    } else {
      const width = window.innerWidth - 80; // Subtract navbar width
      const height = window.innerHeight - 40; // Subtract topbar height
      setWindowSize({ width, height });
      setWindowPosition({ x: 0, y: 0 }); // Position it below the topbar and to the right of the navbar
    }
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    setActiveApp(null);
    setIsMinimized(false);
  };

  return (
    <div className="desktop">
      <div className="navbar">
        <AppIcon icon={browserIcon} label="" />
        <div className="app-icon-wrapper">
          {isMinimized && <div className="minimized-indicator"></div>}
          <AppIcon icon={pdfIcon} label="" onClick={() => { setActiveApp('PDFReader'); setIsMinimized(true); }} />
        </div>
        <AppIcon icon={vscodeIcon} label="" onClick={() => { setActiveApp('VSCodeWindow');  }} />
      </div>
      <div className="topbar">
        <div className="topbar-center">
          <span>{formatDate()}</span>
        </div>
        <div className="topbar-right">
          <div className="wifi-icon">
            <img src={wifiIcon} alt="WiFi" title="" />
          </div>
          <div className="shutdown-icon" onClick={handlePowerClick}>
            <img src={powerIcon} alt="Shutdown" title="Shutdown options" />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="power-menu">
          <div className="menu-item disabled">Shutdown</div>
          <div className="menu-item" onClick={() => window.location.reload()}>Restart</div>
        </div>
      )}
      <div className="desktop-content">
        {activeApp === 'PDFReader' && (
          <Rnd
            size={{ width: windowSize.width, height: windowSize.height }}
            position={windowPosition}
            onDragStop={(e, d) => {
              setWindowPosition({ x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setWindowSize({
                width: parseInt(ref.style.width, 10),
                height: parseInt(ref.style.height, 10),
              });
              setWindowPosition({
                x: position.x,
                y: position.y,
              });
            }}
            enableResizing={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            minWidth={600}
            minHeight={400}
            bounds=".desktop"
            dragHandleClassName="window-title"
          >
            <div className="app-window">
              <div className="window-title">
              <div className='window-title-name'>
              <img src={pdfIcon} width={'15px'}/>
                <div>PDFReader</div>
                </div>
                <div className="window-controls">
                  <div className="window-control-button" onClick={handleMinimize}>
                    <span className="window-control-icon">
                      <img src={minimizeIcon} alt="Minimize" className="window-control-icon" />
                    </span>
                  </div>
                  <div className="window-control-button" onClick={handleMaximize}>
                    <span className="window-control-icon">
                      <img src={maximizeIcon} alt="Maximize" className="window-control-icon" />
                    </span>
                  </div>
                  <div className="window-control-button" onClick={handleClose}>
                    <span className="window-control-icon">
                      <img src={closeIcon} alt="Close" className="window-control-icon" />
                    </span>
                  </div>
                </div>
              </div>
              <PdfReader />
            </div>
          </Rnd>
        )}

        {activeApp === 'VSCodeWindow' && (
          <Rnd
            size={{ width: windowSize.width, height: windowSize.height }}
            position={windowPosition}
            onDragStop={(e, d) => {
              setWindowPosition({ x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setWindowSize({
                width: parseInt(ref.style.width, 10),
                height: parseInt(ref.style.height, 10),
              });
              setWindowPosition({
                x: position.x,
                y: position.y,
              });
            }}
            enableResizing={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            minWidth={600}
            minHeight={400}
            bounds=".desktop"
            dragHandleClassName="window-title"
          >
            <div className="app-window">
              <div className="window-title">
                <div className='window-title-name'>
                <img src={vscodeIcon} width={'15px'}/>
                <div>VSCode</div>
                </div>
                <div className="window-controls">
                  <div className="window-control-button" onClick={handleMinimize}>
                    <span className="window-control-icon">
                      <img src={minimizeIcon} alt="Minimize" className="window-control-icon" />
                    </span>
                  </div>
                  <div className="window-control-button" onClick={handleMaximize}>
                    <span className="window-control-icon">
                      <img src={maximizeIcon} alt="Maximize" className="window-control-icon" />
                    </span>
                  </div>
                  <div className="window-control-button" onClick={handleClose}>
                    <span className="window-control-icon">
                      <img src={closeIcon} alt="Close" className="window-control-icon" />
                    </span>
                  </div>
                </div>
              </div>
              <VSCodeWindow />
            </div>
          </Rnd>
        )}
      </div>
    </div>
  );
};

export default Desktop;
