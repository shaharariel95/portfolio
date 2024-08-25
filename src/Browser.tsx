import React, { useState, useEffect } from 'react';
import './Browser.css';

import homeIcon from './assets/home-icon.svg'; // Add the home icon
import refreshIcon from './assets/refresh-icon.svg'; // Add the refresh icon
import githubIcon from './assets/github-icon.svg'; // Import the GitHub icon


const projects = [
  {
    name: "SignMyName",
    description: "SignMyName is an application that recognizes Israeli Sign Language (ISL) letter gestures and translates them into text. Using CNN models and Mediapipe image processing, it bridges the gap between the hard of hearing and those who can hear through interactive learning.",
    githubLink: "https://github.com/Sign-My-Name/tkinter",
    imageUrl: "./assets/SignMyName-logo.png",
  },
  {
    name: "Internet Web Services",
    description: "Created and oversaw the IAM of an AB – Test website, while also in charge of the DB and the Data transfers between teams. Worked in Node.js, Express, MongoDB, and React.",
    githubLink: "https://github.com/Iam-Shenkar/IAM_Final",
    imageUrl: "./assets/internet-web-services-logo.png",
  },
  {
    name: "CSRF + XXS",
    description: "in Cyber Advanced course we implemented and demonstrated the threat of XSS and CSRF token theaft.",
    githubLink: "https://github.com/shaharariel95/cyber-advanced",
    imageUrl: "./assets/cookie.png",
  },
  {
    name: "Maze-Game",
    description: "Created and implemented an Embbeded maze game with 4 stages and 3 difficulty levels with a MicroChip PIC24 where the controls are the movments of the game board",
    githubLink: "https://github.com/shaharariel95/MazeGame-MicroChip_PIC24FJ256GA705",
    imageUrl: "./assets/Maze-Game.jpg",
  },
  {
    name: "The Chaser",
    description: "Created and implemented the Chaser gameshow in a client-server TCP implementation",
    githubLink: "https://github.com/shaharariel95/The-chase-game",
    imageUrl: "./assets/The-Chaser.jpeg",
  },
  {
    name: "Compiler",
    description: "Create a Compiler for a madeup language as part of the complier course",
    githubLink: "https://github.com/shaharariel95/AnotherLanguageCompiler",
    imageUrl: "./assets/complier.png",
  },
  // Add more projects as needed
];

const Browser: React.FC = () => {
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false); // State for refresh simulation

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setActiveTab(null); // On mobile, start with the homepage view
    }
  }, []);
  
  const openTab = (projectName: string) => {
    if (!openTabs.includes(projectName)) {
      setOpenTabs([...openTabs, projectName]);
    }
    setActiveTab(projectName);
  };

  const closeTab = (projectName: string) => {
    const remainingTabs = openTabs.filter(tab => tab !== projectName);
    setOpenTabs(remainingTabs);

    if (remainingTabs.length > 0) {
      setActiveTab(remainingTabs[0]);
    } else {
      setActiveTab(null);
    }
  };

  const goToHomepage = () => {
    setActiveTab(null);
  };

  const refreshPage = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000); // Simulate refresh by showing empty content for 1 second
  };

  return (
    <div className="browser">
      <div className="browser-topbar">
        <img src={refreshIcon} alt="Refresh" className="refresh-icon" onClick={refreshPage} />
        <img src={homeIcon} alt="Home" className="home-icon" onClick={goToHomepage} />
        <div className="browser-tabs">
          {openTabs.map(tab => (
            <div
              key={tab}
              className={`tab ${tab === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <img
                src={projects.find(project => project.name === tab)?.imageUrl}
                alt={tab}
                className="tab-thumbnail"
              />
              <span className='tab-name'>  
                {tab}
              </span>
              <button onClick={(e) => {
                e.stopPropagation();
                closeTab(tab);
              }}>X</button>
            </div>
          ))}
        </div>
      </div>
      <div className="browser-content">
        {isRefreshing ? (
          <div className="loading-screen">Refreshing...</div>
        ) : (
          activeTab === null ? (
            <div className="browser-homepage">
              <h2 className='browser-sub-title'>Shahar Ariel</h2>
              <h1>Projects</h1>
              <div className="history-grid">
                {projects.map(project => (
                  <div key={project.name} onClick={() => openTab(project.name)}>
                    <div className="history-item">
                      <img src={project.imageUrl} alt={project.name} className="history-item-thumbnail" />
                    </div>
                    <div className="history-item-name">{project.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            projects
              .filter(project => project.name === activeTab)
              .map(project => (
                <div key={project.name} className="project-details-container">
                  <img src={project.imageUrl} alt={project.name} className="project-image" />
                  <div className="project-details">
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="github-link">
                      <img src={githubIcon} alt="GitHub" className="github-icon" />
                      View on GitHub
                    </a>
                  </div>
                </div>
              ))
          )
        )}
      </div>
    </div>
  );  
};

export default Browser;