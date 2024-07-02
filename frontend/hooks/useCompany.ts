import { useState, useEffect } from 'react';
import { Company } from 'Frontend/models/Company';
import { CompanyEndpoint } from 'Frontend/generated/endpoints';

export function useCompany() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const companiesList = await CompanyEndpoint.list();
      const validCompanies = companiesList?.filter((company): company is Company => company !== undefined) || [];
      setCompanies(validCompanies);
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
    fetchCompanies();
  }, []);

  return { companies, loading, error, refetch: fetchCompanies };
}
