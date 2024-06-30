import { useState, useEffect } from 'react';
import { City } from 'Frontend/models/City';
import { State } from 'Frontend/models/State';
import { CityEndpoint, StateEndpoint } from 'Frontend/generated/endpoints';

export function useCity() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const citiesList = await CityEndpoint.list();
      const validCities = citiesList?.filter((city): city is City => city !== undefined) || [];
      setCities(validCities);
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
    fetchCities();
  }, []);

  return { cities, loading, error, refetch: fetchCities };
}
