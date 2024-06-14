import { UserEndpoint } from 'Frontend/generated/endpoints';
import { User } from 'Frontend/models/User';
import Pageable from 'Frontend/generated/dev/hilla/mappedtypes/Pageable';

export async function getUsers(): Promise<User[]> {
  const pageable: Pageable = {
    pageNumber: 0,
    pageSize: 10,
    sort: {
      orders: []
    }
  };

  const response = await UserEndpoint.listUsers(pageable);

  if (!Array.isArray(response)) {
    throw new Error('Invalid response structure');
  }

  return response.map((user: any) => ({
    ...user,
    profilePicture: new Uint8Array(user.profilePicture)
  }));
}

export async function createUser(user: User): Promise<User> {
  const newUser = {
    ...user,
    profilePicture: Array.from(user.profilePicture)
  };
  return UserEndpoint.createUser(newUser as any);
}

export async function updateUser(id: number, user: User): Promise<User> {
  const updatedUser = {
    ...user,
    profilePicture: Array.from(user.profilePicture)
  };
  return UserEndpoint.updateUser(id, updatedUser as any);
}

export async function getUser(id: number): Promise<User> {
  const response: User | undefined = await UserEndpoint.getUser(id);

  if (!response) {
    throw new Error('Failed to fetch user');
  }

  return response;
}

export async function deleteUsers(userIds: number[]): Promise<void> {
  await UserEndpoint.deleteUsers(userIds);
}
