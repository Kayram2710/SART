import { downloadCSV } from './csvExports';
import { t } from './i18n';

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
    reason:
      score[i] === 1
        ? adjustedTimes[i] >= 0
          ? t('reasonNonTargetClick')
          : t('reasonTargetTimeout')
        : adjustedTimes[i] >= 0
        ? t('reasonTargetClick')
        : adjustedTimes[i] === -1
        ? t('reasonNonTargetTimeout')
        : t('reasonTooEarly')
  }));

  const validTimes = combined
    .map(e => e.adjustedTime)
    .filter(t => t >= 0);

  const average =
    validTimes.length > 0
      ? Math.round(validTimes.reduce((a, b) => a + b, 0) / validTimes.length)
      : '-';

  const best  = validTimes.length > 0 ? Math.min(...validTimes) : '-';
  const worst = validTimes.length > 0 ? Math.max(...validTimes) : '-';

  const total   = score.length;
  const correct = score.filter(s => s === 1).length;
  const accuracy = ((correct / total) * 100).toFixed(1);

  const exportData = () => {
    const name = prompt(t('fileNamePrompt'));
    if (!name) return;

    const headerRows = [
      [t('csvOverview')],
      [`${t('score')} (/${total})`, correct],
      [t('accuracy'), `${accuracy}%`],
      [t('avgTime'),  `${average} ms`],
      [t('best'),     `${best} ms`],
      [t('worst'),    `${worst} ms`],
      [],
      [t('csvSpec')],
      [t('csvLength'),  config.length],
      [t('csvTarget'),  config.target],
      [t('csvSpacing'), config.sparcity],
      [t('csvInit'),    config.initTime],
      [t('csvMask'),    config.middleTime],
      [t('csvResp'),    config.endTime],
      []
    ];

    const csvData = combined.map((e, i) => ({
      Index: i + 1,
      [t('csvNumberShown')]:             e.number,
      [t('csvTotalMs')]:                 e.responseTime,
      [t('csvAdjMs')]:                   e.adjustedTime,
      [t('csvScore')]:                   e.score,
      [t('csvReason')]:                  e.reason,
      ' ':                               ' ',
      [t('csvTotalText')]:               e.responseTime >= 0 ? `${e.responseTime} ms` : t('timedOut'),
      [t('csvAdjText')]:
        e.adjustedTime >= 0
          ? `${e.adjustedTime} ms`
          : e.adjustedTime === -1
          ? t('timedOut')
          : t('tooEarly'),
      [t('csvScoreText')]:               e.score === 1 ? t('correct') : t('incorrect')
    }));

    downloadCSV(headerRows, csvData, name);
  };

  return (
    <div className="results-container">
      <h1>{t('results')}</h1>

      <p>
        <strong>{t('score')}:</strong> {correct} / {total} ({accuracy}%)
      </p>
      <p>
        <strong>{t('avgTime')}:</strong> {average} ms
      </p>
      <p>
        <strong>{t('best')}:</strong> {best} ms &nbsp;|&nbsp;
        <strong>{t('worst')}:</strong> {worst} ms
      </p>

      <div>
        <button onClick={exportData} className="saveButton">
          {t('saveData')}
        </button>
        <button onClick={back} className="returnButton">
          {t('returnMenu')}
        </button>
      </div>

      <table className="results-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{t('numberShown')}</th>
            <th>{t('totalClick')}</th>
            <th>{t('responseTime')}</th>
            <th>{t('score')}</th>
            <th>{t('reason')}</th>
          </tr>
        </thead>
        <tbody>
          {combined.map((e, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{e.number}</td>
              <td>
                {e.responseTime >= 0 ? `${e.responseTime} ms` : t('timedOut')}
              </td>
              <td>
                {e.adjustedTime >= 0
                  ? `${e.adjustedTime} ms`
                  : e.adjustedTime === -1
                  ? t('timedOut')
                  : t('na')}
              </td>
              <td>{e.score === 1 ? '✅' : '❌'}</td>
              <td>{e.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
