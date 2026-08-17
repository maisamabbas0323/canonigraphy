import { useState, useEffect, useRef } from 'react';
import { CountryAIInfo } from '../types';
import { fetchCountryInfo } from '../services/geminiService';

export function useCountryInfo(countryCode: string, fallbackContext: string) {
  const [info, setInfo] = useState<CountryAIInfo>({ historicalContext: fallbackContext });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentCodeRef = useRef(countryCode);

  useEffect(() => {
    let cancelled = false;
    currentCodeRef.current = countryCode;

    setIsLoading(true);
    setInfo({ historicalContext: fallbackContext });

    fetchCountryInfo(countryCode, { forceRefresh: true })
      .then((response) => {
        if (!cancelled && currentCodeRef.current === countryCode && response?.info) {
          setInfo({
            historicalContext: response.info.historicalContext || fallbackContext,
            generatedByApi: response.info.generatedByApi,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setInfo({ historicalContext: fallbackContext });
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [countryCode, fallbackContext]);

  return { info, isLoading };
}
