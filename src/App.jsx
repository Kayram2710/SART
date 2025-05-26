import React, { useState , useEffect} from 'react';
import Sequencer from './Sequencer';
import MainMenu from './MainMenu';
import { loadConfigFromCookies, saveConfigToCookies } from './configStorage';

function App() {
  return (
    <div className="app">
      <Screen />
    </div>
  );
}

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

  const setupTest = () => setScreen('count');
  const goToTest = () => setScreen('test');
  const goToResults = (score, responseTimes) => {
    setResults({ score, responseTimes });
    setScreen('results');
  };
  const goToMenu = () => setScreen('menu');

  return (
    <div className="screen">
      {screen === 'menu' && <MainMenu config={config} setConfig={setConfig} start={setupTest} />}
      {screen === 'count' && <Countdown start={goToTest} />}
      {screen === 'test' && <Test config={config} onComplete={goToResults} />}
      {screen === 'results' && <Results results={results} back={goToMenu} />}
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

function Results({ results, back }) {
  return (
    <div>
      <h1>Results</h1>
      <p>Score: {results.score.join(', ')}</p>
      <p>
        Response Times:{' '}
        {results.responseTimes.map(r => (r >= 0 ? `${r} ms` : '×')).join(', ')}
      </p>
      <button onClick={back}>Return to Menu</button>
    </div>
  );
}

export default App;
