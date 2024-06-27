import { useState, useEffect } from 'react';
import { Country } from 'Frontend/models/Country';
import { State } from 'Frontend/models/State';
import { CountryEndpoint, StateEndpoint } from 'Frontend/generated/endpoints';

export function useStates() {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStates = async () => {
    setLoading(true);
    try {
      const statesList = await StateEndpoint.list();
      const validStates = statesList?.filter((state): state is State => state !== undefined) || [];
      setStates(validStates);
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
    fetchStates();
  }, []);

  return { states, loading, error, refetch: fetchStates };
}
