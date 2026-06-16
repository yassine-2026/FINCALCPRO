import fs from 'fs';
import path from 'path';

if (!fs.existsSync('public/locales')) {
  fs.mkdirSync('public/locales', { recursive: true });
}

const srcLocales = 'src/locales';
const destLocales = 'public/locales';

if (fs.existsSync(srcLocales)) {
  const files = fs.readdirSync(srcLocales).filter(f => f.endsWith('.json'));
  files.forEach(f => {
    fs.renameSync(path.join(srcLocales, f), path.join(destLocales, f));
  });
  console.log('Moved ' + files.length + ' JSON files to public/locales');
}
