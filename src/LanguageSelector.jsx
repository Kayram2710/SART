import { getLang, setLang } from './i18n';

export default function LanguageSelector() {
  return (
    <select
      className="langSelector"
      value={getLang()}
      onChange={e => setLang(e.target.value)}
    >
      <option value="en">EN</option>
      <option value="es">ES</option>
    </select>
  );
}
