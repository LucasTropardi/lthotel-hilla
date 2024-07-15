import { useState, useEffect } from 'react';
import { Guest } from 'Frontend/models/Guest';
import { GuestEndpoint } from 'Frontend/generated/endpoints';

export function useGuest() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const guestsList = await GuestEndpoint.list();
      const validGuests = guestsList?.filter((guest): guest is Guest => guest !== undefined) || [];
      setGuests(validGuests);
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
    fetchGuests();
  }, []);

  return { guests, loading, error, refetch: fetchGuests };
}
