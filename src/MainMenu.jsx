import React, { useState, useRef, useEffect } from 'react';
import { setSkipTutorial, loadSkipTutorial, clearConfigCookies  } from "./configStorage";

const CONFIG_META = {
  length: { label: "Test Length", description: "Number of values displayed in the sequence." },
  target: { label: "Target Number", description: "The number the user must respond to." },
  sparcity: { label: "Target Spacing", description: "Minimum non-targets between each target." },
  initTime: { label: "Initial Display Time (ms)", description: "Duration to show number before masking." },
  middleTime: { label: "Mask Time (ms)", description: "Duration of normal asterisk before bold." },
  endTime: { label: "Response Window (ms)", description: "Time allowed for response before timeout." }
};

function MainMenu({ config, setConfig, start }) {
  const [formOpen, setFormOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    if (formOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [formOpen]);

  return (
    <div>
      <h1>Welcome to SART</h1>
      <button className="startButton" onClick={start}>Start Test</button>
      <br/>
      <div className='skipTut'>
        <label>
          <input
            type="checkbox"
            defaultChecked={loadSkipTutorial()}
            onChange={e => setSkipTutorial(e.target.checked)}
          />  Skip Tutorial
        </label>
      </div>
      <div>
          <button onClick={() => setFormOpen(p => !p)} className='configButton'>
          {formOpen ? 'Hide Test Configurations' : 'Show Test Configurations'}
          </button>
          <div className="config-container" style={{ maxHeight: height }}>
              <div ref={contentRef} >
                  <div className="config-grid">
                      {Object.entries(config).map(([key, value]) => (
                      <div key={key} className="config-item">
                          <label>{CONFIG_META[key]?.label || key}</label>
                          <input
                          type="number"
                          value={value}
                          onChange={e => setConfig({ ...config, [key]: Number(e.target.value) })}
                          />
                          <small><br/>{CONFIG_META[key]?.description}</small>
                      </div>
                      ))}
                  </div>
                  <button
                      className="resetButton"
                      onClick={() => {
                          if (window.confirm("Reset all settings to default? This will reload the page.")) {
                              clearConfigCookies();
                              window.location.reload();
                          }}
                      }>
                      Reset to Default
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
}

export default MainMenu;
