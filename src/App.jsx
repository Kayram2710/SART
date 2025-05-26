import React, { useState } from 'react';
import Sequencer from './Sequencer';

function App() {
  const [phase, setPhase] = useState('menu');
  const [config, setConfig] = useState({
    length: 66,
    target: 3,
    sparcity: 4,
    initTime: 250,
    middleTime: 250,
    endTime: 1250,
  });
  const [results, setResults] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  if (phase === 'test') {
    return <Sequencer {...config} onComplete={(score, responseTimes) => {
      setResults({ score, responseTimes });
      setPhase('results');
    }} />;
  }

  if (phase === 'results') {
    return (
      <div className="app">
        <h1>Results</h1>
        <p>Score: {results.score.join(', ')}</p>
        <p>Response Times: {results.responseTimes.map(r => r >= 0 ? `${r} ms` : '×').join(', ')}</p>
        <button onClick={() => setPhase('menu')}>Return to Menu</button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Welcome to SART</h1>
      <p>This is a behavioral response test.</p>
      <button onClick={() => setPhase('test')}>Start Test</button>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setFormOpen(p => !p)}>
          {formOpen ? 'Hide Settings' : 'Show Settings'}
        </button>

        {formOpen && (
          <div style={{ marginTop: '1rem' }}>
            {Object.entries(config).map(([key, value]) => (
              <div key={key} style={{ marginBottom: '0.5rem' }}>
                <label>
                  {key}:&nbsp;
                  <input
                    type="number"
                    value={value}
                    onChange={e => setConfig({ ...config, [key]: Number(e.target.value) })}
                  />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
