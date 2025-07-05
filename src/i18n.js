import Cookies from 'js-cookie';
import { strings } from './translations';

const LANG_COOKIE = 'sartLang';

export function getLang() {
  return Cookies.get(LANG_COOKIE) || 'en';
}

export function setLang(code) {
  Cookies.set(LANG_COOKIE, code, { expires: 365 });
  window.location.reload();
}

export function t(key, ...args) {
  const lang      = getLang();
  const entry     =
    (strings[lang] && strings[lang][key]) ??
    (strings[FALLBACK_LANG] && strings[FALLBACK_LANG][key]) ??
    key;

  return typeof entry === 'function' ? entry(...args) : entry;
}
