import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schema?: object;
}

export function SEO({ title, description, canonicalPath, schema }: SEOProps) {
  const domain = 'https://fincalcpro.com'; // Placeholder, replace with actual production domain
  const url = canonicalPath ? `${domain}${canonicalPath}` : domain;
  
  return (
    <Helmet>
      <title>{title} | FinCalcPro</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | FinCalcPro`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | FinCalcPro`} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
