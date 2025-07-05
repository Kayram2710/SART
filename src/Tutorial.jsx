import { useState, useEffect, useRef } from 'react';
import { t } from './i18n';

const Back   = () => <span>&#x25C0;</span>;
const Replay = () => <span>&#x27F3;</span>;
const Next   = () => <span>&#x25B6;</span>;

function Demo({ active, cfg, showButton, autoClick, skipTarget, replayKey }) {
  if (!active) return null;

  const { sequence, target, initTime, middleTime, endTime } = cfg;
  const [i,  setI ] = useState(0);
  const [ph, setPh] = useState(0);
  const [disp, setD]= useState('');

  useEffect(() => { setI(0); setPh(0); }, [replayKey]);

  useEffect(() => {
    if (i >= sequence.length) return;

    let tmo;
    if (ph === 0) {
      setD(sequence[i]);
      const extra = i === 0 ? 500 : 0;
      tmo = setTimeout(() => setPh(1), initTime + extra);
    } else if (ph === 1) {
      setD('*');
      tmo = setTimeout(() => setPh(2), middleTime);
    } else {
      setD(<strong>*</strong>);
      if (showButton && autoClick && !(skipTarget && sequence[i] === target)) {
        setTimeout(() => {
          const btn = document.querySelector('.goDemo');
          btn?.classList.add('press');
          setTimeout(() => btn?.classList.remove('press'), 220);
        }, endTime * 0.3);
      }
      tmo = setTimeout(() => { setI(n => n + 1); setPh(0); }, endTime);
    }
    return () => clearTimeout(tmo);
  }, [i, ph, sequence, target, showButton, autoClick, skipTarget, initTime, middleTime, endTime]);

  return (
    <div className="demo fadeDemo">
      <div className="demoNum">{disp}</div>
      {showButton && <button className="goDemo" disabled>{t('goButton')}</button>}
    </div>
  );
}

/* tutorial pages — now use translation keys */
const makePages = (cfg, key) => [
  {
    lines: [ t('tut1l1'), t('tut1l2'), ' ' ],
    demo : { showButton:false, autoClick:null, skipTarget:false, replayKey:key }
  },
  {
    lines: [ t('tut2l1'), t('tut2l2'), t('tut2l3'), ' ' ],
    demo : { showButton:true, autoClick:true,  skipTarget:false, replayKey:key }
  },
  {
    lines: [ t('tut3l1', cfg.target), t('tut3l2'), t('tut3l3') ],
    demo : { showButton:true, autoClick:true,  skipTarget:true,  replayKey:key }
  },
  {
    lines: [ t('tut4l1'), t('tut4l2'), ' ' ],
    demo : null
  }
];

export default function Tutorial({ config, onDone }) {
  const demoCfg = { ...config, sequence: [7, 2, config.target, 5] };

  const [page, setPage]    = useState(0);
  const [vis,  setVis]     = useState(1);
  const [key,  setKey]     = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const timer = useRef(null);

  const pages = makePages(demoCfg, key);
  const cur   = pages[page];
  const last  = pages.length - 1;

  /* line-by-line fade-in */
  useEffect(() => {
    clearInterval(timer.current);
    setVis(1);
    setNavVisible(false);
    const total = cur.lines.length;
    timer.current = setInterval(() => {
      setVis(v => {
        if (v + 1 >= total) clearInterval(timer.current);
        return v + 1;
      });
    }, 2000);
    return () => clearInterval(timer.current);
  }, [page, key]);

  /* skip click */
  const finishFade = () => {
    clearInterval(timer.current);
    setVis(cur.lines.length);
    setNavVisible(true);
  };

  const ready = vis >= cur.lines.length;

  /* delayed nav appearance */
  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => setNavVisible(true), 9000);
    return () => clearTimeout(id);
  }, [ready, page, key]);

  const replay = () => setKey(k => k + 1);

  return (
    <div key={page} className="tutorialWrapper contentArea" onClick={finishFade}>
      {!ready && <div className="skipLayer" />}
      <div className="tutorialBox">
        {cur.lines.map((txt, i) => (
          <p key={i} className="tLine" style={{ opacity: i < vis ? 1 : 0, transition: 'opacity .6s' }}>
            {txt}
          </p>
        ))}

        {page === last && ready && (
            <div>
                <br/>
                <button className="startButton fadeDemo" onClick={onDone} style={{ marginTop: '1rem' }}>
                    {t('start')}
                </button>
                <br/>
                <br/>
            </div>
        )}

        {cur.demo && <Demo active={ready} cfg={demoCfg} {...cur.demo} />}

        {navVisible && (
          <div className="btnRow fadeDemo" onClick={e => e.stopPropagation()}>
            {page > 0 ? (
              <button onClick={() => setPage(p => p - 1)}><Back /></button>
            ) : <span style={{ width: '2.5rem' }} />}

            <button onClick={replay}><Replay /></button>

            {page < last ? (
              <button onClick={() => setPage(p => p + 1)}><Next /></button>
            ) : (
              <span style={{ width: '2.5rem' }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
