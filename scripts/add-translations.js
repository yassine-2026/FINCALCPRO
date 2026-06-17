import fs from 'fs';
import path from 'path';

const localesDir = 'public/locales';
const files = fs.readdirSync(localesDir);

const newKeys = {
  ar: { "sc": { "inv_t": "ما هو عائد {{amount}} بفائدة {{rate}}% لمدة {{years}} سنوات؟", "inv_d": "اكتشف القيمة المستقبلية لاستثمار بقيمة {{amount}} بمعدل فائدة {{rate}}% على مدار {{years}} سنوات.", "loan_t": "الدفعات الشهرية لقرض بقيمة {{amount}} بفائدة {{rate}}% لمدة {{years}} سنوات", "loan_d": "احسب الدفعات الشهرية والتكلفة الإجمالية لقرض بقيمة {{amount}} بمعدل فائدة {{rate}}% على مدار {{years}} سنوات.", "sim": "سيناريوهات بديلة", "pop": "استكشف سيناريوهات لآلاف الحسابات" }},
  en: { "sc": { "inv_t": "What is the return on {{amount}} at {{rate}}% for {{years}} years?", "inv_d": "Discover the future value of a {{amount}} investment returning {{rate}}% annually over {{years}} years.", "loan_t": "Monthly payments for a {{amount}} loan at {{rate}}% for {{years}} years", "loan_d": "Calculate the monthly payment and total interest of a {{amount}} loan at {{rate}}% over {{years}} years.", "sim": "Alternative Scenarios", "pop": "Explore Popular Scenarios" }},
  fr: { "sc": { "inv_t": "Quel est le rendement de {{amount}} à {{rate}}% pendant {{years}} ans ?", "inv_d": "Découvrez la valeur future d'un investissement de {{amount}} avec un taux de {{rate}}% sur {{years}} ans.", "loan_t": "Paiements mensuels pour un prêt de {{amount}} à {{rate}}% sur {{years}} ans", "loan_d": "Calculez les mensualités d'un prêt de {{amount}} à {{rate}}% sur {{years}} ans.", "sim": "Scénarios alternatifs", "pop": "Scénarios populaires" }},
  es: { "sc": { "inv_t": "¿Cuál es el retorno de {{amount}} al {{rate}}% por {{years}} años?", "inv_d": "Descubre el valor futuro de {{amount}} invertido al {{rate}}% por {{years}} años.", "loan_t": "Pagos mensuales de un préstamo de {{amount}} al {{rate}}% por {{years}} años", "loan_d": "Calcula el pago mensual de un préstamo de {{amount}} al {{rate}}% por {{years}} años.", "sim": "Escenarios alternativos", "pop": "Escenarios Populares" }},
};

files.forEach(file => {
  if (!file.endsWith('.json')) return;
  const lang = file.replace('.json', '');
  const filePath = path.join(localesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.sc = newKeys[lang] ? newKeys[lang].sc : newKeys.en.sc;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});
console.log('Translations added.');
