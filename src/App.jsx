import React, { useState, useEffect } from 'react';
import Sequencer from './Sequencer';
import MainMenu from './MainMenu';
import Results   from './Results';
import Tutorial  from './Tutorial';
import { loadConfigFromCookies, saveConfigToCookies, loadSkipTutorial } from './configStorage';
import { t } from './i18n';

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
      length: 40,
      target: 3,
      sparcity: 4,
      initTime: 250,
      middleTime: 250,
      endTime: 1250,
    })
  );

  useEffect(() => saveConfigToCookies(config), [config]);
  const [results, setResults] = useState(null);
  const [pendingResults, setPendingResults] = useState(null);

  const setupTest = () => (loadSkipTutorial() ? startTest() : startTutorial());
  const startTutorial = () => setScreen('tutorial');
  const startTest = () => setScreen('count');
  const goToTest = () => setScreen('test');
  const goToResults = (score, responseTimes, sequence) => {
    setPendingResults({ score, responseTimes, sequence });
    setScreen('complete');
  };

  const confirmResults = () => {
    const input = prompt(t('pwdPrompt'));
    if (input === TEST_PASSWORD) {
      setResults(pendingResults);
      setScreen('results');
    } else {
      alert(t('pwdWrong'));
    }
  };

  const goToMenu = () => {
    if (window.confirm(t('backConfirm'))) setScreen('menu');};

  return (
    <div className={`screen ${screen === 'results' ? 'results-screen' : ''}`}>
      <div className='contentArea'>
        {screen === 'menu' && <MainMenu config={config} setConfig={setConfig} start={setupTest} />}
        {screen === 'count' && <Countdown start={goToTest} />}
        {screen === 'test' && <Test config={config} onComplete={goToResults} />}
        {screen === 'results' && <Results results={results} back={goToMenu} config={config} />}
        {screen === 'complete' && <CompleteScreen onConfirm={confirmResults} />}
        {screen === 'tutorial' && <Tutorial config={config} onDone={startTest} />}
      </div>
    </div>
  );
}

function CompleteScreen({ onConfirm }) {
  return (
    <div>
      <h1>{t('testComplete')}</h1>
      <button onClick={onConfirm} className="startButton">
        {t('checkResults')}
      </button>
    </div>
  );
}

function Countdown({ start }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      const id = setTimeout(start, 800);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(id);
  }, [count, start]);

  return (
    <div>
      <h1>{t('testWillStart')}</h1>
      <div className="countdown">
        {count > 0 ? count : t('go')}
      </div>
    </div>
  );
}

function Test({ config, onComplete }) {
  return <Sequencer {...config} onComplete={onComplete} />;
}

export default App;
