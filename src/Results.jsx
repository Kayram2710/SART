import { downloadCSV } from './csvExports';

function Results({ results, back, config }) {
    const { score, responseTimes, sequence } = results;
  
    const adjustedTimes = responseTimes.map(t =>
      t >= 0 ? t - (config.initTime + config.middleTime) : -1
    );
  
    const combined = sequence.map((number, i) => ({
      number,
      responseTime: responseTimes[i],
      adjustedTime: adjustedTimes[i],
      score: score[i],
      reason: score[i] === 1 ? (adjustedTimes[i] >= 0 ? "Clicked Button on Non Target":  "Timed Out on Target") : (adjustedTimes[i] >= 0 ? "Clicked Button on Target" : (adjustedTimes[i] === -1 ? 'Timed Out on Non-Target' : 'Clicked Button Too Early') ),
    }));
  
    const validTimes = combined
      .map(e => e.adjustedTime)
      .filter(t => t >= 0);
  
    const average = validTimes.length > 0
      ? Math.round(validTimes.reduce((a, b) => a + b, 0) / validTimes.length)
      : "-";
  
    const best = validTimes.length > 0 ? Math.min(...validTimes) : "-";
    const worst = validTimes.length > 0 ? Math.max(...validTimes) : "-";
  
    const total = score.length;
    const correct = score.filter(s => s === 1).length;

    const exportData = () => {
        const name = prompt("Enter a file name");
        if (!name) return;
      
        const headerRows = [
            [`Results Overview`],
            [`Score (/${total})`, `${correct}`],
            [`Accuracy`, `${(correct/total)*100}%`],
            [`Average Response Time`, `${average} ms`],
            [`Best Response Time`, `${best} ms`],
            [`Worst Response Time`, `${worst} ms`],
            [],
            [`Test Configuration Specs`],
            [`Test Length`, config.length],
            [`Target Number`, config.target],
            [`Target Spacing`, config.sparcity],
            [`Initial Display Time (ms)`, config.initTime],
            [`Mask Time (ms)`, config.middleTime],
            [`Response Window (ms)`, config.endTime],
            [],
        ];
      
        // Tabular response data
        const csvData = combined.map((entry, i) => ({
          Index: i + 1,
          "Number Shown": entry.number,
          "Total Time To Click Button (ms)": entry.responseTime,
          "Response Time (ms)": entry.adjustedTime,
          "Score": entry.score,
          "Reason":
            score[i] === 1
              ? entry.adjustedTime >= 0
                ? "Clicked Button on Non Target"
                : "Timed Out on Target"
              : entry.adjustedTime >= 0
              ? "Clicked Button on Target"
              : entry.adjustedTime === -1
              ? "Timed Out on Non-Target"
              : "Clicked Button Too Early",
          " ": " ",
          "Total Time To Click Button (ms) - Textually Aided":
            entry.responseTime >= 0 ? `${entry.responseTime} ms` : "N/A - Timed Out",
          "Response Time (ms) - Textually Aided":
            entry.adjustedTime >= 0
              ? `${entry.adjustedTime} ms`
              : entry.adjustedTime === -1
              ? "N/A -Timed Out"
              : "N/A - Too Early",
          "Score - Textually Aided": entry.score === 1 ? "Correct" : "Incorrect",
        }));
      
        downloadCSV(headerRows, csvData, name);
      };
      
  
    return (
      <div className="results-container">
        <h1>Results</h1>
        <p><strong>Score:</strong> {correct} / {total} ({(correct / total)*100}%) </p>
        <p><strong>Average Response Time:</strong> {average} ms</p>
        <p><strong>Best:</strong> {best} ms | <strong>Worst:</strong> {worst} ms</p>
  
        <div>
            <button onClick={exportData} className="saveButton">Save Data</button>
            <button onClick={back} className="returnButton">Return to Menu</button>
        </div>

  
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Number Shown</th>
              <th>Total Time To Click</th>
              <th>Response Time</th>
              <th>Score</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {combined.map((entry, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{entry.number}</td>
                <td>{entry.responseTime >= 0 ? `${entry.responseTime} ms` : 'Timed Out'}</td>
                <td>{entry.adjustedTime >= 0 ? `${entry.adjustedTime} ms` : (entry.adjustedTime === -1 ? 'Timed Out' : 'N/A') }</td>
                <td>{entry.score === 1 ? '✅' : '❌'}</td>
                <td>{entry.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default Results;
  