function Results({ results, back }) {
    const { score, responseTimes, sequence } = results;
  
    const combined = sequence.map((number, i) => ({
      number,
      responseTime: responseTimes[i],
      score: score[i],
    }));
  
    const validTimes = combined
      .map(e => e.responseTime)
      .filter(t => t >= 0);
  
    const average = validTimes.length > 0
      ? Math.round(validTimes.reduce((a, b) => a + b, 0) / validTimes.length)
      : "-";
  
    const best = validTimes.length > 0 ? Math.min(...validTimes) : "-";
    const worst = validTimes.length > 0 ? Math.max(...validTimes) : "-";
  
    const total = score.length;
    const correct = score.filter(s => s === 1).length;
  
    return (
      <div className="results-container">
        <h1>Results</h1>
        <p><strong>Score:</strong> {correct} / {total}</p>
        <p><strong>Average Time:</strong> {average} ms</p>
        <p><strong>Best:</strong> {best} ms | <strong>Worst:</strong> {worst} ms</p>
        <button onClick={back} className="">Return to Menu</button>
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Number Shown</th>
              <th>Response Time</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {combined.map((entry, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{entry.number}</td>
                <td>{entry.responseTime >= 0 ? `${entry.responseTime} ms` : '×'}</td>
                <td>{entry.score === 1 ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
      </div>
    );
  }
  
  export default Results;
  