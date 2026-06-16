import fs from 'fs';
import path from 'path';

const domain = 'https://fincalcpro.com';
const languages = ['ar','en','fr','es','de','it','pt','ru','tr','zh','ja','ko','hi','id','nl','pl','uk','th','vi','ms'];
const routes = [
  '',
  '/compound-interest',
  '/loan-calculator',
  '/roi-calculator',
  '/privacy-policy',
  '/terms',
  '/disclaimer',
  '/contact',
  '/about'
];

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Generate an individual sitemap per language
languages.forEach(lang => {
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;
  
  routes.forEach(route => {
    const url = `${domain}/${lang}${route}`;
    sitemapContent += `  <url>\n`;
    sitemapContent += `    <loc>${url}</loc>\n`;
    
    // Add hreflang links
    languages.forEach(l => {
      sitemapContent += `    <xhtml:link rel="alternate" hreflang="${l}" href="${domain}/${l}${route}" />\n`;
    });
    // Add x-default
    sitemapContent += `    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}/en${route}" />\n`;
    
    sitemapContent += `  </url>\n`;
  });
  
  sitemapContent += `</urlset>\n`;
  fs.writeFileSync(path.join(publicDir, `sitemap-${lang}.xml`), sitemapContent);
});

// Generate Sitemap Index
let indexContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
indexContent += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

languages.forEach(lang => {
  indexContent += `  <sitemap>\n`;
  indexContent += `    <loc>${domain}/sitemap-${lang}.xml</loc>\n`;
  const date = new Date().toISOString().split('T')[0];
  indexContent += `    <lastmod>${date}</lastmod>\n`;
  indexContent += `  </sitemap>\n`;
});

indexContent += `</sitemapindex>\n`;
fs.writeFileSync(path.join(publicDir, `sitemap.xml`), indexContent);

console.log('✅ Generated sitemaps for 20 languages successfully.');
