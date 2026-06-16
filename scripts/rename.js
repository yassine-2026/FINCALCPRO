import fs from 'fs';
import path from 'path';

function replaceInDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else {
      if (['.tsx', '.ts', '.html', '.json'].some(ext => fullPath.endsWith(ext))) {
        let content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('FinCalcPro')) {
          content = content.replace(/FinCalcPro/g, 'FINCALCPRO');
          fs.writeFileSync(fullPath, content);
          console.log('Replaced in', fullPath);
        }
      }
    }
  }
}

replaceInDir('src');
replaceInDir('public');

let indexContent = fs.readFileSync('index.html', 'utf8');
indexContent = indexContent.replace(/Global Financial Calculators/g, 'FINCALCPRO');
fs.writeFileSync('index.html', indexContent);
console.log('Replaced in index.html');
