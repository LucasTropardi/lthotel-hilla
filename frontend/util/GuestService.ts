import { GuestEndpoint } from 'Frontend/generated/endpoints';
import { Guest } from 'Frontend/models/Guest';
import Pageable from 'Frontend/generated/dev/hilla/mappedtypes/Pageable';
import { ErrorWithMessage } from 'Frontend/types/ErrorTypes';

export async function getGusts(): Promise<Guest[]> {
  const pageable: Pageable = {
    pageNumber: 0,
    pageSize: 1000,
    sort: {
      orders: []
    }
  };

  const response = await GuestEndpoint.listGuests(pageable);

  if (!Array.isArray(response)) {
    throw new Error('Invalid response structure');
  }

  return response.map((guest: any) => ({
    ...guest,
  }));
}

export async function getGuestsByName(name: string): Promise<Guest[]> {
  const response = await GuestEndpoint.listGuestByName(name);

  if (!Array.isArray(response)) {
    throw new Error('Invalid response structure');
  }

  return response.map((guest: any) => ({
    ...guest,
  }));
}

export async function createGuest(guest: Omit<Guest, 'id'>): Promise<Guest> {
  try {
    const savedGuest = await GuestEndpoint.save(guest as any);
    if (!savedGuest) {
      throw new Error('Failed to create guest');
    }
    return savedGuest;
  } catch (error: unknown) {
    const e = error as ErrorWithMessage;
    if (e.message.includes('Duplicate entry')) {
      throw new Error('Duplicate entry for guest.');
    }
    throw new Error('Error creating guest.');
  }
}

export async function updateGuest(guest: Guest): Promise<Guest> {
  try {
    const result = await GuestEndpoint.save(guest as any); 
    if (!result) {
      throw new Error('Failed to update guest');
    }
    return result;
  } catch (error: unknown) {
    const e = error as ErrorWithMessage;
    if (e.message.includes('Duplicate entry')) {
      throw new Error('Duplicate entry for guest.');
    }
    throw new Error('Error updating guest.');
  }
}

export async function getGuest(id: number): Promise<Guest> {
  const response: Guest | undefined = await GuestEndpoint.load(id);

  if (!response) {
    throw new Error('Failed to fetch guest');
  }

  return response;
}

export async function deleteGuests(guestIds: number[]): Promise<void> {
  await GuestEndpoint.deleteGuests(guestIds);
}
