import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import './Desktop.css';
import AppIcon from './AppIcon';
import Browser from './Browser';
import PdfReader from './PdfReader';
import VSCodeWindow from './VSCodeWindow';
import browserIcon from './assets/browser-icon.svg';
import pdfIcon from './assets/pdf-icon.svg';
import vscodeIcon from './assets/vscode-icon.svg';
import wifiIcon from './assets/wifi-icon.svg';
import powerIcon from './assets/power-icon.svg';
import minimizeIcon from './assets/minimize-icon.svg';
import maximizeIcon from './assets/maximize-icon.svg';
import closeIcon from './assets/close-icon.svg';

interface AppInstance {
  id: string;
  app: string;
  minimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  maximized: boolean;
}

const Desktop: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [openApps, setOpenApps] = useState<AppInstance[]>([]);
  const [zIndexCounter, setZIndexCounter] = useState(1);

  useEffect(() => {
    // Open the Browser window by default when the component mounts
    handleOpenApp('Browser');
  },[]);

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

  const handleOpenApp = (app: string) => {
    setOpenApps(prevApps => {
      const existingApp = prevApps.find(appInstance => appInstance.app === app);
      if (existingApp) {
        const updatedApps = prevApps.map(appInstance =>
          appInstance.app === app ? { ...appInstance, minimized: false } : appInstance
        );
        
        // Update zIndex
        setZIndexCounter(prevZIndex => {
          const newZIndex = prevZIndex + 1;
          return newZIndex;
        });
  
        // Focus the app
        setTimeout(() => handleAppFocus(existingApp.id), 0);
  
        return updatedApps;
      } else {
        const newAppInstance: AppInstance = {
          id: `${app}-${Date.now()}`,
          app,
          minimized: false,
          position: { x: 100, y: 50 },
          size: { width: 800, height: 600 },
          zIndex: zIndexCounter,
          maximized: false,
        };
        
        // Update zIndex
        setZIndexCounter(prevZIndex => prevZIndex + 1);
  
        return [...prevApps, newAppInstance];
      }
    });
  };

  const handleMinimizeApp = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenApps(prevApps => {
      const updatedApps = prevApps.map(appInstance =>
        appInstance.id === id ? { ...appInstance, minimized: true } : appInstance
      );
      return updatedApps;
    });
  
    // Focus on the next visible app
    const visibleApps = openApps.filter(app => !app.minimized && app.id !== id);
    if (visibleApps.length > 0) {
      handleAppFocus(visibleApps[visibleApps.length - 1].id);
    }
  };

  const handleMaximizeApp = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenApps(openApps.map(appInstance => {
      if (appInstance.id === id) {
        if (appInstance.maximized) {
          return {
            ...appInstance,
            size: { width: 800, height: 600 },
            position: { x: 100, y: 50 },
            maximized: false,
          };
        } else {
          return {
            ...appInstance,
            size: { width: window.innerWidth - 80, height: window.innerHeight - 40 },
            position: { x: 0, y: 0 },
            maximized: true,
          };
        }
      }
      return appInstance;
    }));
  };

  const handleCloseApp = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenApps(openApps.filter(appInstance => appInstance.id !== id));
  };

  const handleAppFocus = (id: string) => {
    setOpenApps(prevApps => prevApps.map(appInstance =>
      appInstance.id === id ? { ...appInstance, zIndex: zIndexCounter } : appInstance
    ));
    setZIndexCounter(prevZIndex => prevZIndex + 1);
  };

  const updateAppPositionAndSize = (id: string, position: { x: number; y: number }, size: { width: number; height: number }) => {
    setOpenApps(openApps.map(appInstance =>
      appInstance.id === id ? { ...appInstance, position, size } : appInstance
    ));
  };

  return (
    <div className="desktop">
      <div className="navbar">
        {['Browser', 'PDFReader', 'VSCodeWindow'].map(app => (
          <div key={app} className="app-icon-wrapper">
            <AppIcon
              icon={app === 'Browser' ? browserIcon : app === 'PDFReader' ? pdfIcon : vscodeIcon}
              label=""
              onClick={() => handleOpenApp(app)}
              isMinimized={openApps.some(appInstance => appInstance.app === app)}
            />
          </div>
        ))}
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
        {openApps.map(appInstance => (
          !appInstance.minimized && (
            <Rnd
              key={`${appInstance.id}-${appInstance.size.width}-${appInstance.size.height}-${appInstance.position.x}-${appInstance.position.y}-${appInstance.minimized}-${appInstance.maximized}`}
              style={{ 
                zIndex: appInstance.zIndex, 
                display: appInstance.minimized ? 'none' : 'block',
                visibility: appInstance.minimized ? 'hidden' : 'visible'
              }}
              size={appInstance.size}
              position={appInstance.position}
              onDragStop={(e, d) => {
                // eslint-disable-next-line no-constant-condition
                if(false){
                  console.log(e)}
                if (!appInstance.maximized) {
                  updateAppPositionAndSize(appInstance.id, { x: d.x, y: Math.max(d.y, 40) }, appInstance.size);
                }
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                // eslint-disable-next-line no-constant-condition
                if(false){
                console.log(e, direction, delta)}
                const newSize = {
                  width: parseInt(ref.style.width, 10),
                  height: parseInt(ref.style.height, 10),
                };
                updateAppPositionAndSize(appInstance.id, { x: position.x, y: Math.max(position.y, 40) }, newSize);
              }}
              enableResizing={{
                top: !appInstance.maximized,
                right: !appInstance.maximized,
                bottom: !appInstance.maximized,
                left: !appInstance.maximized,
                topRight: !appInstance.maximized,
                bottomRight: !appInstance.maximized,
                bottomLeft: !appInstance.maximized,
                topLeft: !appInstance.maximized,
              }}
              disableDragging={appInstance.maximized}
              minWidth={300}
              minHeight={200}
              bounds=".desktop"
              dragHandleClassName="window-title"
              onClick={() => handleAppFocus(appInstance.id)}
            >
              <div className="app-window">
                <div className="window-title">
                  <div className='window-title-name'>
                    <img src={appInstance.app === 'Browser' ? browserIcon : appInstance.app === 'PDFReader' ? pdfIcon : vscodeIcon} width={'15px'} />
                    <div>{appInstance.app}</div>
                  </div>
                  <div className="window-controls">
                    <div className="window-control-button" onClick={(e) => handleMinimizeApp(appInstance.id, e)}>
                      <span className="window-control-icon">
                        <img src={minimizeIcon} alt="Minimize" className="window-control-icon" />
                      </span>
                    </div>
                    <div className="window-control-button" onClick={(e) => handleMaximizeApp(appInstance.id, e)}>
                      <span className="window-control-icon">
                        <img src={maximizeIcon} alt="Maximize" className="window-control-icon" />
                      </span>
                    </div>
                    <div className="window-control-button" onClick={(e) => handleCloseApp(appInstance.id, e)}>
                      <span className="window-control-icon">
                        <img src={closeIcon} alt="Close" className="window-control-icon" />
                      </span>
                    </div>
                  </div>
                </div>
                {appInstance.app === 'Browser' && <Browser />}
                {appInstance.app === 'PDFReader' && <PdfReader />}
                {appInstance.app === 'VSCodeWindow' && <VSCodeWindow />}
              </div>
            </Rnd>
          )
        ))}
      </div>
    </div>
  );
};

export default Desktop;
