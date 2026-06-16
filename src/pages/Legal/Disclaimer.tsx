import { useTranslation } from 'react-i18next';
import { SEO } from '../../components/SEO';

export default function Disclaimer() {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto py-12 prose prose-slate">
      <SEO title={t('legal.dt')} description={t('legal.d1')} />
      <h1>{t('legal.dt')}</h1>
      <p>{t('legal.d1')}</p>
    </div>
  );
}
