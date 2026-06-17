import fs from 'fs';
import path from 'path';

const langs = ['en', 'es', 'fr', 'de', 'pt', 'ar', 'ru', 'tr', 'it', 'nl', 'zh', 'ja', 'hi', 'id', 'ko', 'pl', 'uk', 'th', 'vi', 'ms'];
const amounts = [1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];
const rates = [4, 5, 6, 7];
const years = [5, 10, 20, 30];

// Only a subset to avoid an enormous sitemap that takes forever, but big enough.
// 9 amounts * 4 rates * 4 years = 144 scenarios per feature per lang
// 2 features (invest/loan) = 288 URLs per lang
// 20 langs * 288 = 5760 URLs

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

for (const lang of langs) {
  for (const a of amounts) {
    for (const r of rates) {
      for (const y of years) {
        
        // Invest
        xml += `  <url>\n    <loc>https://fincalcpro.com/${lang}/scenario/invest/${a}/${r}/${y}</loc>\n  </url>\n`;
        
        // Loan
        xml += `  <url>\n    <loc>https://fincalcpro.com/${lang}/scenario/loan/${a}/${r}/${y}</loc>\n  </url>\n`;

      }
    }
  }
}

xml += `</urlset>`;

fs.writeFileSync('public/sitemap-scenarios.xml', xml);
console.log('sitemap-scenarios.xml created with ' + (langs.length * amounts.length * rates.length * years.length * 2) + ' URLs.');

// Let's also update public/sitemap.xml to include it as a sitemap index if it's currently an index, otherwise just add it to robots.txt
