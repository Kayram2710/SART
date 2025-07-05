import { useState, useEffect, useRef } from "react";

const Back   = () => <span>&#x25C0;</span>;
const Replay = () => <span>&#x27F3;</span>;
const Next   = () => <span>&#x25B6;</span>;

function Demo({ active, cfg, showButton, autoClick, skipTarget, replayKey }) {
  if (!active) return null;

  const { sequence, target, initTime, middleTime, endTime } = cfg;
  const [i, setI]   = useState(0);
  const [ph,setPh]  = useState(0);
  const [disp,setD] = useState("");

  useEffect(() => { setI(0); setPh(0); }, [replayKey]);

  useEffect(() => {
    if (i >= sequence.length) return;
    let t;
    if (ph === 0) {
      setD(sequence[i]);
      t = setTimeout(() => setPh(1), initTime);
    } else if (ph === 1) {
      setD("*");
      t = setTimeout(() => setPh(2), middleTime);
    } else {
      setD(<strong>*</strong>);
      if (
        showButton && autoClick &&
        !(skipTarget && sequence[i] === target)
      ) {
        setTimeout(() => {
          const btn = document.querySelector(".goDemo");
          btn?.classList.add("press");
          setTimeout(() => btn?.classList.remove("press"), 220);
        }, endTime * 0.3);
      }
      t = setTimeout(() => { setI(x => x + 1); setPh(0); }, endTime);
    }
    return () => clearTimeout(t);
  }, [i, ph, sequence, target, showButton, autoClick, skipTarget, initTime, middleTime, endTime]);

  return (
    <div className="demo fadeDemo">
      <div className="demoNum">{disp}</div>
      {showButton && <button className="goDemo" disabled>GO</button>}
    </div>
  );
}

const makePages = (cfg, key) => [
  {
    lines:[
      "Welcome to the SART examination.",
      "In this test, you will be shown sequences that look like the following:",
      " ",
    ],
    demo:{showButton:false,autoClick:null,skipTarget:false,replayKey:key}
  },
  {
    lines:[
      "Your task is simple:",
      "Once the asterix * turns bold,",
      "Click the Go button:",
      " "
    ],
    demo:{showButton:true,autoClick:true,skipTarget:false,replayKey:key}
  },
  {
    lines:[
      `However, if the number shown is ${cfg.target},`,
      "Do not click the button,",
      "Let the time run out:"
    ],
    demo:{showButton:true,autoClick:true,skipTarget:true,replayKey:key}
  },
  { lines:["Now that the instructions are clear,","Are you ready to start the test?"," "], demo:null }
];

export default function Tutorial({ config, onDone }) {
  const demoCfg={ ...config, sequence:[7,2,config.target,5] };

  const [page,setPage] = useState(0);
  const [vis,setVis]   = useState(1);
  const [key,setKey]   = useState(0);
  const timer          = useRef(null);

  const pages = makePages(demoCfg, key);
  const cur   = pages[page];
  const last  = pages.length-1;

  /* stagger lines */
  useEffect(() => {
    clearInterval(timer.current);
    setVis(1);
    const total = cur.lines.length;
    timer.current = setInterval(() => {
      setVis(v => {
        if (v + 1 >= total) clearInterval(timer.current);
        return v + 1;
      });
    }, 2000);
    return () => clearInterval(timer.current);
  }, [page, key]);

  /* finish fade early */
  const finishFade = () => {
    clearInterval(timer.current);
    setVis(cur.lines.length);
  };

  const ready = vis >= cur.lines.length;

  /* replay both text & demo */
  const replay = () => { setKey(k => k + 1); };

  return (
    <div key={page} className="tutorialWrapper">
      {!ready && <div className="skipLayer" onClick={finishFade}/>}

      <div className="tutorialBox">
        {cur.lines.map((txt,i)=>(
          <p key={i} className="tLine"
             style={{opacity:i<vis?1:0,transition:"opacity .6s"}}>
            {txt}
          </p>
        ))}

        {page === last && ready && (
            <button className="startButton fadeDemo" onClick={onDone}>
                Start
            </button>
            )}

        {cur.demo && (
          <Demo active={ready} cfg={demoCfg} {...cur.demo}/>
        )}

        {ready && (
          <div className="btnRow fadeDemo">
            {page>0 ? (
              <button onClick={()=>setPage(p=>p-1)}><Back/></button>
            ) : <span style={{width:"2.5rem"}}/>}

            <button onClick={replay}><Replay/></button>

            {page<last ? (
              <button onClick={()=>setPage(p=>p+1)}><Next/></button>
            ) : (
              <span style={{width:"2.5rem"}}/>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
