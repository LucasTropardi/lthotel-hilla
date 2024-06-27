import { CountryEndpoint, StateEndpoint } from 'Frontend/generated/endpoints';
import { Country } from 'Frontend/models/Country';
import { State } from 'Frontend/models/State';
import Pageable from 'Frontend/generated/dev/hilla/mappedtypes/Pageable';
import { ErrorWithMessage } from 'Frontend/types/ErrorTypes';

export async function getStates(): Promise<State[]> {
  const pageable: Pageable = {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      orders: []
    }
  };

  const response = await StateEndpoint.listStates(pageable);

  if (!Array.isArray(response)) {
    throw new Error('Invalid response structure');
  }

  return response.map((state: any) => ({
    ...state,
  }));
}

export async function getStatesByName(name: string): Promise<State[]> {
  const response = await StateEndpoint.listStateByName(name);

  if (!Array.isArray(response)) {
    throw new Error('Invalid response structure');
  }

  return response.map((state: any) => ({
    ...state,
  }));
}

export async function createState(state: Omit<State, 'id'>): Promise<State> {
  try {
    const savedState = await StateEndpoint.save(state as any);
    if (!savedState) {
      throw new Error('Failed to create state');
    }
    return savedState;
  } catch (error: unknown) {
    const e = error as ErrorWithMessage;
    if (e.message.includes('Duplicate entry')) {
      throw new Error('Duplicate entry for name.');
    }
    throw new Error('Error creating country.');
  }
}

export async function updateState(state: State): Promise<State> {
  try {
    const result = await StateEndpoint.save(state as any);
    if (!result) {
      throw new Error('Failed to update state');
    }
    return result;
  } catch (error: unknown) {
    const e = error as ErrorWithMessage;
    if (e.message.includes('Duplicate entry')) {
      throw new Error('Duplicate entry for name.');
    }
    throw new Error('Error updating state.');
  }
}

export async function getState(id: number): Promise<State> {
  const response: State | undefined = await StateEndpoint.load(id);

  if (!response) {
    throw new Error('Failed to fetch state');
  }

  return response;
}

export async function deleteStates(stateIds: number[]): Promise<void> {
  await StateEndpoint.deleteStates(stateIds);
}
