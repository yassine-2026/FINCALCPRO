import { useTranslation } from 'react-i18next';
import { SEO } from '../../components/SEO';
import { Mail } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto py-12">
      <SEO title={t('legal.ct')} description={t('legal.cd')} />
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-black leading-tight text-slate-900 tracking-tight">{t('legal.ct')}</h1>
        <p className="text-slate-500 max-w-md mx-auto">{t('legal.cd')}</p>
        
        <div className="mt-12 p-10 bg-white rounded-3xl border border-slate-100 flex flex-col items-center max-w-md mx-auto shadow-xl shadow-slate-200/50">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{t('legal.cr')}</h3>
          <p className="text-slate-500 mb-8 text-center text-sm leading-relaxed">{t('legal.cr_d')}</p>
          <a href="mailto:support@fincalcpro.com" className="w-full py-4 text-center bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors uppercase tracking-widest text-xs" dir="ltr">
            support@fincalcpro.com
          </a>
        </div>
      </div>
    </div>
  );
}
