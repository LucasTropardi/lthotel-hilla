import { CountryEndpoint } from 'Frontend/generated/endpoints';
import { Country } from 'Frontend/models/Country';
import Pageable from 'Frontend/generated/dev/hilla/mappedtypes/Pageable';
import { ErrorWithMessage } from 'Frontend/types/ErrorTypes';

export async function getCountries(): Promise<Country[]> {
  const pageable: Pageable = {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      orders: []
    }
  };

  const response = await CountryEndpoint.listCountries(pageable);

  if (!Array.isArray(response)) {
    throw new Error('Invalid response structure');
  }

  return response.map((country: any) => ({
    ...country,
  }));
}

export async function getCountriesByName(name: string): Promise<Country[]> {
  const response = await CountryEndpoint.listCountryByName(name);

  if (!Array.isArray(response)) {
    throw new Error('Invalid response structure');
  }

  return response.map((country: any) => ({
    ...country,
  }));
}

export async function createCountry(country: Omit<Country, 'id'>): Promise<Country> {
  try {
    const savedCountry = await CountryEndpoint.save(country as any);
    if (!savedCountry) {
      throw new Error('Failed to create country');
    }
    return savedCountry;
  } catch (error: unknown) {
    const e = error as ErrorWithMessage;
    if (e.message.includes('Duplicate entry')) {
      throw new Error('Duplicate entry for name.');
    }
    throw new Error('Error creating country.');
  }
}

export async function updateCountry(country: Country): Promise<Country> {
  try {
    const result = await CountryEndpoint.save(country as any); // Supondo que o mesmo endpoint é usado para update
    if (!result) {
      throw new Error('Failed to update country');
    }
    return result;
  } catch (error: unknown) {
    const e = error as ErrorWithMessage;
    if (e.message.includes('Duplicate entry')) {
      throw new Error('Duplicate entry for name.');
    }
    throw new Error('Error updating country.');
  }
}

export async function getCountry(id: number): Promise<Country> {
  const response: Country | undefined = await CountryEndpoint.load(id);

  if (!response) {
    throw new Error('Failed to fetch country');
  }

  return response;
}

export async function deleteCountries(countryIds: number[]): Promise<void> {
  await CountryEndpoint.deleteCountries(countryIds);
}
