export const languages = [
  { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  { code: 'en', name: 'English', dir: 'ltr', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'es', name: 'Español', dir: 'ltr', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', dir: 'ltr', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', dir: 'ltr', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', dir: 'ltr', flag: '🇷🇺' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr', flag: '🇹🇷' },
  { code: 'zh', name: '中文', dir: 'ltr', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', dir: 'ltr', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', dir: 'ltr', flag: '🇰🇷' },
  { code: 'hi', name: 'हिन्दी', dir: 'ltr', flag: '🇮🇳' },
  { code: 'id', name: 'Bahasa Indonesia', dir: 'ltr', flag: '🇮🇩' },
  { code: 'nl', name: 'Nederlands', dir: 'ltr', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', dir: 'ltr', flag: '🇵🇱' },
  { code: 'uk', name: 'Українська', dir: 'ltr', flag: '🇺🇦' },
  { code: 'th', name: 'ไทย', dir: 'ltr', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', dir: 'ltr', flag: '🇻🇳' },
  { code: 'ms', name: 'Bahasa Melayu', dir: 'ltr', flag: '🇲🇾' },
];

export function getLanguage(code: string) {
  return languages.find((l) => l.code === code) || languages[1];
}

export function formatLocalNumber(num: number, lang: string, options?: Intl.NumberFormatOptions) {
  let locale = lang;
  if (lang === 'ar') locale = 'ar-EG'; // Arabic-Indic numerals
  if (lang === 'hi') locale = 'hi-IN-u-nu-deva'; // Devanagari numerals
  
  return new Intl.NumberFormat(locale, options).format(num);
}
