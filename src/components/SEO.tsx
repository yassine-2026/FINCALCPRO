import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';
import { languages } from '../lib/i18n-utils';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schema?: object;
}

export function SEO({ title, description, canonicalPath, schema }: SEOProps) {
  const domain = 'https://fincalcpro.com'; 
  const location = useLocation();
  const { lang } = useParams();
  
  // Clean path without language to construct canonical and hreflang
  const cleanPath = location.pathname.replace(`/${lang}`, '') || '/';
  const url = `${domain}/${lang}${cleanPath === '/' ? '' : cleanPath}`;
  
  return (
    <Helmet>
      <title>{title} | FINCALCPRO</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | FINCALCPRO`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | FINCALCPRO`} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Generate hreflang for all supported languages */}
      {languages.map((l) => (
        <link 
          key={l.code}
          rel="alternate" 
          hrefLang={l.code} 
          href={`${domain}/${l.code}${cleanPath === '/' ? '' : cleanPath}`} 
        />
      ))}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={`${domain}/en${cleanPath === '/' ? '' : cleanPath}`} 
      />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
