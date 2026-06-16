import { useTranslation } from 'react-i18next';
import { SEO } from '../../components/SEO';

export default function Terms() {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto py-12 prose prose-slate">
      <SEO title={t('legal.tt')} description={t('legal.t1')} />
      <h1>{t('legal.tt')}</h1>
      <p>{t('legal.t1')}</p>
    </div>
  );
}
