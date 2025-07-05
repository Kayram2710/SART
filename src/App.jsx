import React, { useState , useEffect} from 'react';
import Sequencer from './Sequencer';
import MainMenu from './MainMenu';
import Results from './Results';
import Tutorial from './Tutorial';
import { loadConfigFromCookies, saveConfigToCookies } from './configStorage';

function App() {
  return (
    <div className="app">
      <Screen />
    </div>
  );
}

const TEST_PASSWORD = "pass";

function Screen() {
  const [screen, setScreen] = useState('menu');
  const [config, setConfig] = useState(() =>
    loadConfigFromCookies({
      length: 66,
      target: 3,
      sparcity: 4,
      initTime: 250,
      middleTime: 250,
      endTime: 1250,
    })
  );
    useEffect(() => {
    saveConfigToCookies(config);
  }, [config]);
  const [results, setResults] = useState(null);

  const [pendingResults, setPendingResults] = useState(null);

  const setupTest = () => setScreen('count');
  const setupTutorial = () => setScreen('tutorial');
  
  const goToTest = () => setScreen('test');
  const goToResults = (score, responseTimes, sequence) => {
    setPendingResults({ score, responseTimes, sequence });
    setScreen('complete');
  };
  

  const confirmResults = () => {
    const input = prompt("Enter password to view results:");
    if (input === TEST_PASSWORD) {
      setResults(pendingResults);
      setScreen('results');
    } else {
      alert("Incorrect password.");
    }
  };

  const goToMenu = () => {
	if (window.confirm("Are you sure you want to go back? You will lose all unsaved data.")) {
		setScreen('menu');
	}};


  return (
    <div className={`screen ${screen === 'results' ? 'results-screen' : ''}`}>
      {screen === 'menu' && <MainMenu config={config} setConfig={setConfig} start={setupTutorial} />}
      {screen === 'count' && <Countdown start={goToTest} />}
      {screen === 'test' && <Test config={config} onComplete={goToResults} />}
      {screen === 'results' && <Results results={results} back={goToMenu} config={config} />}
      {screen === 'complete' && <CompleteScreen onConfirm={confirmResults} />}
      {screen === 'tutorial' && <Tutorial config={config} onDone={setupTest} />}

    </div>
  );
}

function CompleteScreen({ onConfirm }) {
  return (
    <div>
      <h1>Test Complete!</h1>
      <button onClick={onConfirm} className='startButton'>
        Check Results
      </button>
    </div>
  );
}

function Countdown({ start }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      const timeout = setTimeout(() => {
        start();
      }, 800);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setCount(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, start]);

  return (
    <div>
      <h1>Test will start in...</h1>
      <div className="countdown">
        {count > 0 ? count : "Go!"}
      </div>
    </div>
  );
}


function Test({ config, onComplete }) {
  return <Sequencer {...config} onComplete={onComplete} />;
}

export default App;
