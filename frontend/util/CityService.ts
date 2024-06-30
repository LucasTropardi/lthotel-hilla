import { CityEndpoint, StateEndpoint } from 'Frontend/generated/endpoints';
import { City } from 'Frontend/models/City';
import { State } from 'Frontend/models/State';
import Pageable from 'Frontend/generated/dev/hilla/mappedtypes/Pageable';
import { ErrorWithMessage } from 'Frontend/types/ErrorTypes';

export async function getCities(): Promise<City[]> {
  const pageable: Pageable = {
    pageNumber: 0,
    pageSize: 1000,
    sort: {
      orders: []
    }
  };

  const response = await CityEndpoint.listCities(pageable);

  if (!Array.isArray(response)) {
    throw new Error('Invalid response structure');
  }

  return response.map((city: any) => ({
    ...city,
  }));
}

export async function getCitiesByName(name: string): Promise<City[]> {
  const response = await CityEndpoint.listCityByName(name);

  if (!Array.isArray(response)) {
    throw new Error('Invalid response structure');
  }

  return response.map((city: any) => ({
    ...city,
  }));
}

export async function createCity(city: Omit<City, 'id'>): Promise<City> {
  try {
    const savedCity = await CityEndpoint.save(city as any);
    if (!savedCity) {
      throw new Error('Failed to create city');
    }
    return savedCity;
  } catch (error: unknown) {
    const e = error as ErrorWithMessage;
    if (e.message.includes('Duplicate entry')) {
      throw new Error('Duplicate entry for name.');
    }
    throw new Error('Error creating country.');
  }
}

export async function updateCity(city: City): Promise<City> {
  try {
    const result = await CityEndpoint.save(city as any);
    if (!result) {
      throw new Error('Failed to update state');
    }
    return result;
  } catch (error: unknown) {
    const e = error as ErrorWithMessage;
    if (e.message.includes('Duplicate entry')) {
      throw new Error('Duplicate entry for city.');
    }
    throw new Error('Error updating state.');
  }
}

export async function getCity(id: number): Promise<City> {
  const response: City | undefined = await CityEndpoint.load(id);

  if (!response) {
    throw new Error('Failed to fetch state');
  }

  return response;
}

export async function deleteCities(cityIds: number[]): Promise<void> {
  await CityEndpoint.deleteCities(cityIds);
}
