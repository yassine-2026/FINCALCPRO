import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { defaultCurrencyByLang } from '../lib/currencies';

interface CurrencyContextType {
  currency: string;
  rates: Record<string, number>;
  setCurrency: (code: string) => void;
  convertFromUSD: (value: number) => number;
  formatCurrency: (value: number, overrideLang?: string) => string;
  allCurrencies: string[];
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const { lang } = useParams();
  const currentLang = lang || 'en';
  
  const [currency, setCurrencyState] = useState<string>('USD');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastLang, setLastLang] = useState(currentLang);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize currency based on lang or localstorage, and change currency on lang change
  useEffect(() => {
    if (!isInitialized) {
      const savedCurrency = localStorage.getItem('fincalcpro_currency');
      if (savedCurrency) {
        setCurrencyState(savedCurrency);
      } else {
        setCurrencyState(defaultCurrencyByLang[currentLang] || 'USD');
      }
      setIsInitialized(true);
    } else if (lastLang !== currentLang) {
      const defaultCur = defaultCurrencyByLang[currentLang] || 'USD';
      setCurrencyState(defaultCur);
      setLastLang(currentLang);
      localStorage.setItem('fincalcpro_currency', defaultCur);
    }
  }, [currentLang, lastLang, isInitialized]);

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const cacheKey = 'fincalcpro_rates_cache';
        const cachedStr = localStorage.getItem(cacheKey);
        
        if (cachedStr) {
          const cached = JSON.parse(cachedStr);
          const cacheAge = Date.now() - cached.timestamp;
          if (cacheAge < 12 * 60 * 60 * 1000) { // 12 hours cache
            setRates(cached.rates);
            setIsLoading(false);
            return;
          }
        }

        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        if (data && data.rates) {
          setRates(data.rates);
          localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            rates: data.rates
          }));
        }
      } catch (err) {
        console.error('Failed to fetch exchange rates', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRates();
  }, []);

  const setCurrency = (code: string) => {
    setCurrencyState(code);
    localStorage.setItem('fincalcpro_currency', code);
  };

  const convertFromUSD = useCallback((valueUSD: number) => {
    if (!rates[currency]) return valueUSD; // fallback to USD if rate not found
    return valueUSD * rates[currency];
  }, [currency, rates]);

  const formatCurrency = useCallback((value: number, overrideLang?: string) => {
    let locale = overrideLang || currentLang;
    if (locale === 'ar') locale = 'ar-EG';
    if (locale === 'hi') locale = 'hi-IN-u-nu-deva';

    // If it's a huge number or invalid, handle gracefully
    if (isNaN(value)) return '';

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch {
      // Fallback if combination is unsupported
      return `${currency} ${value.toFixed(2)}`;
    }
  }, [currentLang, currency]);

  return (
    <CurrencyContext.Provider value={{
      currency,
      rates,
      setCurrency,
      convertFromUSD,
      formatCurrency,
      allCurrencies: Object.keys(rates),
      isLoading
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
