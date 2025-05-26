import Cookies from 'js-cookie';

const COOKIE_KEY = 'sartConfig';
const COOKIE_EXPIRY_DAYS = 365;

export function saveConfigToCookies(config) {
  Cookies.set(COOKIE_KEY, JSON.stringify(config), { expires: COOKIE_EXPIRY_DAYS });
}

export function loadConfigFromCookies(defaultConfig) {
  const stored = Cookies.get(COOKIE_KEY);
  if (!stored) return defaultConfig;

  try {
    const parsed = JSON.parse(stored);
    return { ...defaultConfig, ...parsed }; // fallback to default values for missing keys
  } catch (e) {
    console.error('Invalid config cookie:', e);
    return defaultConfig;
  }
}

export function clearConfigCookies() {
  Cookies.remove(COOKIE_KEY);
}
