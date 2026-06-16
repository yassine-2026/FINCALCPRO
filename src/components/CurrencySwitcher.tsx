import { ChangeEvent } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

export default function CurrencySwitcher() {
  const { currency, setCurrency, allCurrencies } = useCurrency();

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  return (
    <select 
      value={currency} 
      onChange={handleCurrencyChange}
      className="bg-transparent border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2 font-medium appearance-none min-w-[70px] text-center"
      dir="ltr"
    >
      {allCurrencies.length > 0 ? (
        allCurrencies.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))
      ) : (
        <option value={currency}>{currency}</option>
      )}
    </select>
  );
}
