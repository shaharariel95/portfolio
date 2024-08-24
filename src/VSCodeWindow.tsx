import React, { useState } from 'react';
import './VSCodeWindow.css';

import arrowDownIcon from './assets/arrow-down-icon.svg';
import arrowRightIcon from './assets/arrow-right-icon.svg';
import folderIcon from './assets/folder-icon.svg';
import htmlIcon from './assets/html-icon.svg';
import cssIcon from './assets/css-icon.svg';
import JSIcon from './assets/js-icon.svg';

const VSCodeWindow: React.FC = () => {
  const [activeFile, setActiveFile] = useState<string>('index.html');
  const [isFolderOpen, setIsFolderOpen] = useState(true); // Folder state

  const toggleFolder = () => {
    setIsFolderOpen(!isFolderOpen);
  }
  const renderContent = () => {
    switch (activeFile) {
      case 'index.html':
        return (
            <pre className="code">
            <span className="tag">&lt;section <span className='attribute'>class</span>=<span className='string'>"experience-section"</span>&gt;</span>
            <br />
            &nbsp;&nbsp;<span className="tag">&lt;h1 <span className='attribute'>class</span>=<span className='string'>"experience-title"</span>&gt;</span>Experience<span className="tag">&lt;/h1&gt;</span>
            <br />
            &nbsp;&nbsp;<span className="tag">&lt;div <span className='attribute'>class</span>=<span className='string'>"experience-content"</span>&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;h2 <span className='attribute'>class</span>=<span className='string'>"job-duration"</span>&gt;</span>2023 - 2024<span className="tag">&lt;/h2&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;h3 <span className='attribute'>class</span>=<span className='string'>"job-title"</span>&gt;</span>Uniper-care<span className="tag">&lt;/h3&gt;</span> <span className='comment'>/* Empowering older adults through connected and active living. */ </span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;ul <span className='attribute'>class</span>=<span className='string'>"job-details"</span>&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;li&gt;</span><span className="attribute">Role:</span> Full Stack Developer<span className="tag">&lt;/li&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;li&gt;</span>Responsible for developing and integrating new features to enhance and maintain the platform capabilities, utilizing NodeJS, Angular, Vue, and MongoDB.<span className="tag">&lt;/li&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;/ul&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;h2 <span className='attribute'>class</span>=<span className='string'>"job-duration"</span>&gt;</span>2021 – 2022<span className="tag">&lt;/h2&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;h3 <span className='attribute'>class</span>=<span className='string'>"job-title"</span>&gt;</span>Percepto Robotics<span className="tag">&lt;/h3&gt;</span> <span className='comment'>/* Autonomous inspection & monitoring for industrial sites. */ </span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;ul <span className='attribute'>class</span>=<span className='string'>"job-details"</span>&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;li&gt;</span><span className="attribute">Role:</span> Technical Support<span className="tag">&lt;/li&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;li&gt;</span>Solving software and hardware problems in the company products for clients worldwide. Work with Linux environment, log analysis and extraction in Bash terminal.<span className="tag">&lt;/li&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;/ul&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className='tag'>&lt;div&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;h2 <span className='attribute'>class</span>=<span className='string'>"job-duration"</span>&gt;</span>2020 – 2019<span className="tag">&lt;/h2&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;h3 <span className='attribute'>class</span>=<span className='string'>"job-title"</span>&gt;</span>Kedma Ltd. Moshav Idan<span className="tag">&lt;/h3&gt;</span> <span className='comment'>/* Marketing and export management. */</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;h2 <span className='attribute'>class</span>=<span className='string'>"job-duration"</span>&gt;</span>2016 – 2017<span className="tag">&lt;/h2&gt;</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="tag">&lt;h3 <span className='attribute'>class</span>=<span className='string'>"job-title"</span>&gt;</span>Elbit System<span className="tag">&lt;/h3&gt;</span> <span className='comment'>/* Manually tested software while serving in the IDF. */</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className='tag'>&lt;/div&gt;</span>
            <br />
            &nbsp;&nbsp;<span className="tag">&lt;/div&gt;</span>
            <br />
            <span className="tag">&lt;/section&gt;</span>
          </pre>
        );
      case 'style.css':
        return (
          <pre className="code">
            <span className="tag">.education</span> <span className="tag">{'{'}</span>
            <br />
            &nbsp;&nbsp;<span className="attribute">degree</span>: <span className="value">B.Sc. degree in Software Engineering</span>;
            <br />
            &nbsp;&nbsp;<span className="attribute">institution</span>: <span className="value">Shenkar College – Engineering Faculty</span>;
            <br />
            <span className="tag">{'}'}</span>
          </pre>
        );
      case 'script.js':
        return (
          <pre className="code">
            <span className="keyword">function</span> <span className="function">signMyName</span>() <span className="tag">{'{'}</span>
            <br />
            &nbsp;&nbsp;<span className="comment">// Deep learning and computer vision education app</span>
            <br />
            &nbsp;&nbsp;<span className="keyword">console</span>.<span className="function">log</span>(<span className="string">'Teaching Israeli Sign Language using TensorFlow and MediaPipe'</span>);
            <br />
            <span className="tag">{'}'}</span>
            <br />
            <br />
            <span className="keyword">function</span> <span className="function">internetWebServices</span>() <span className="tag">{'{'}</span>
            <br />
            &nbsp;&nbsp;<span className="comment">// AB test website with Node.js, Express, MongoDB, React</span>
            <br />
            &nbsp;&nbsp;<span className="keyword">console</span>.<span className="function">log</span>(<span className="string">'Managing IAM, DB, and Data transfers'</span>);
            <br />
            <span className="tag">{'}'}</span>
            <br />
            <br />
            <span className="comment">/* Programming Languages */</span>
            <br />
            <span className="keyword">const</span> <span className="function">languages</span> = <span className="tag">[</span><span className="string">'Python'</span>, <span className="string">'JavaScript'</span>, <span className="string">'C'</span>, <span className="string">'Java'</span>, <span className="string">'C++'</span>, <span className="string">'Bash'</span>, <span className="string">'HTML'</span>, <span className="string">'CSS'</span><span className="tag">];</span>
            <br />
            <span className="keyword">languages</span>.<span className="function">forEach</span>(<span className="keyword">lang</span> <span className="tag">={'>'}</span> <span className="keyword">console</span>.<span className="function">log</span>(<span className="string">`Proficient in {'${lang}'}`</span>));
            <br />
            <br />
            <span className="comment">/* Courses */</span>
            <br />
            <span className="keyword">const</span> <span className="function">courses</span> = <span className="tag">[</span><span className="string">'Image Processing'</span>, <span className="string">'Computer Vision'</span>, <span className="string">'Practical ML'</span>, <span className="string">'Cloud Computing'</span><span className="tag">];</span>
            <br />
            <span className="keyword">courses</span>.<span className="function">forEach</span>(<span className="keyword">course</span> <span className="tag">={'>'}</span> <span className="keyword">console</span>.<span className="function">log</span>(<span className="string">`Completed course in {'${course}'}`</span>));
          </pre>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="vscode-window">
      <div className="vscode-sidebar">
        <div className='vscode-folder'>
            <button onClick={toggleFolder} className="folder-toggle-button">
            <img src={isFolderOpen ? arrowDownIcon : arrowRightIcon} alt="Toggle Folder" />
            <img src={folderIcon} alt="" />
            <div className='vscoder-folder-name'>About Me</div>
            </button>
        </div>
        {isFolderOpen && (
        <div className='vs-code-files'>
            <button
            className={activeFile === 'index.html' ? 'active' : ''}
            onClick={() => setActiveFile('index.html')}
            >
            <div className='vscode-folder'>
                <img src={htmlIcon} alt="" />
                <div>
                experience.html
                </div>
            </div>
            </button>
        <button
          className={activeFile === 'style.css' ? 'active' : ''}
          onClick={() => setActiveFile('style.css')}
        >
          <div className='vscode-folder'>
                <img src={cssIcon} alt="" />
                <div>
                education.css
                </div>
            </div>
        </button>
        <button
          className={activeFile === 'script.js' ? 'active' : ''}
          onClick={() => setActiveFile('script.js')}
        >
          <div className='vscode-folder'>
                <img src={JSIcon} alt="" />
                <div>
                projects.js
                </div>
            </div>
        </button>
        </div>
        )}
      </div>
      <div className="vscode-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default VSCodeWindow;
