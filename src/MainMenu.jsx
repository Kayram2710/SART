import React, { useState, useRef, useEffect } from 'react';
import { setSkipTutorial, loadSkipTutorial, clearConfigCookies } from './configStorage';
import { t, getLang, setLang } from './i18n';
import LanguageSelector from './LanguageSelector';

const CONFIG_META = {
  length:   { label: t('cfgLengthLabel'),   description: t('cfgLengthDesc')   },
  target:   { label: t('cfgTargetLabel'),   description: t('cfgTargetDesc')   },
  sparcity: { label: t('cfgSpacingLabel'),  description: t('cfgSpacingDesc')  },
  initTime: { label: t('cfgInitLabel'),     description: t('cfgInitDesc')     },
  middleTime:{label: t('cfgMaskLabel'),     description: t('cfgMaskDesc')     },
  endTime:  { label: t('cfgRespLabel'),     description: t('cfgRespDesc')     }
};


function MainMenu({ config, setConfig, start }) {
  const [formOpen, setFormOpen] = useState(false);
  const [height,   setHeight]   = useState('0px');
  const contentRef              = useRef(null);

  useEffect(() => {
    if (formOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('0px');
    }
  }, [formOpen]);

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <LanguageSelector/>
      <button className="startButton" onClick={start}>
        {t('startTest')}
      </button>
      <br/>
      <div className="skipTut">
        <label>
          <input
            type="checkbox"
            defaultChecked={loadSkipTutorial()}
            onChange={e => setSkipTutorial(e.target.checked)}
          />{' '}
          {t('skipTut')}
        </label>
      </div>

      <div>
        <button
          onClick={() => setFormOpen(o => !o)}
          className="configButton"
        >
          {formOpen ? t('hideCfg') : t('showCfg')}
        </button>

        <div className="config-container" style={{ maxHeight: height }}>
          <div ref={contentRef}>
            <div className="config-grid">
              {Object.entries(config).map(([key, value]) => (
                <div key={key} className="config-item">
                  <label>{CONFIG_META[key]?.label || key}</label>
                  <input
                    type="number"
                    value={value}
                    onChange={e =>
                      setConfig({ ...config, [key]: Number(e.target.value) })
                    }
                  />
                  <small>
                    <br />
                    {CONFIG_META[key]?.description}
                  </small>
                </div>
              ))}
            </div>

            <button
              className="resetButton"
              onClick={() => {
                if (window.confirm(t('resetDefaultsQ'))) {
                  clearConfigCookies();
                  window.location.reload();
                }
              }}
            >
              {t('reset')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
