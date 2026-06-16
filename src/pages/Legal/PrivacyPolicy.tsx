import { useTranslation } from 'react-i18next';
import { SEO } from '../../components/SEO';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto py-12 prose prose-slate">
      <SEO title={t('legal.pt')} description={t('legal.p1')} />
      <h1>{t('legal.pt')}</h1>
      <p>{t('legal.p1')}</p>
    </div>
  );
}
