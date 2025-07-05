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

export function t(key) {
  const lang = getLang();
  return strings[lang]?.[key] ?? strings.en[key] ?? key;
}
