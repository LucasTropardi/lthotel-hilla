import { useState, useEffect } from 'react';
import { Country } from 'Frontend/models/Country';
import { CountryEndpoint } from 'Frontend/generated/endpoints';

export function useCountry() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const countriesList = await CountryEndpoint.list();
      const validCountries = countriesList?.filter((country): country is Country => country !== undefined) || [];
      setCountries(validCountries);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return { countries, loading, error, refetch: fetchCountries };
}
