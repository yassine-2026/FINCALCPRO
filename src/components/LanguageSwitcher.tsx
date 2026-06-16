import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { languages } from '../lib/i18n-utils';

export default function LanguageSwitcher() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const pathWithoutLang = location.pathname.replace(`/${lang}`, '');
    navigate(`/${newLang}${pathWithoutLang}`);
  };

  return (
    <select 
      value={lang || 'en'} 
      onChange={handleLanguageChange}
      className="bg-transparent border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 font-medium"
      dir="ltr"
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code}>
          {l.flag} {l.name}
        </option>
      ))}
    </select>
  );
}
