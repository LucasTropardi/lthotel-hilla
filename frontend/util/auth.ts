import { configureAuth } from '@hilla/react-auth';
import User from 'Frontend/generated/com/ltsoftwaresupport/lthotel/data/User';
import { UserEndpoint } from 'Frontend/generated/endpoints';

const getAuthenticatedUser = async () => {
  return await UserEndpoint.getAuthenticatedUser();
};

// Fun��o para obter roles do usu�rio
const getRoles = (user: User) => {
  return user?.roles || [];
};

const auth = configureAuth(getAuthenticatedUser, { getRoles });

export const useAuth = auth.useAuth;
export const AuthProvider = auth.AuthProvider;