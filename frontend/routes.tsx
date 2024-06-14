import { protectRoutes } from '@hilla/react-auth';
import HelloWorldView from 'Frontend/views/helloworld/HelloWorldView.js';
import LoginView from 'Frontend/views/login/LoginView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import UserGrid from './views/user/UserGrid';
import UserForm from './views/user/UserForm';
import ProtectedRoute from './util/ProtectedRoute';
import { Role } from './models/Role';

const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));

const UserFormWrapper = () => {
  const handleFormSubmit = () => {
    // Lógica para lidar com a submissão do formulário
  };

  return <UserForm onSubmit={handleFormSubmit} />;
};

const routing = protectRoutes([
  {
    element: <MainLayout />,
    handle: { title: 'Main' },
    children: [
      { path: '/', element: <HelloWorldView />, handle: { title: 'Hello World', requiresLogin: true } },
      { path: '/about', element: <AboutView />, handle: { title: 'About', requiresLogin: true } },
      {
        path: '/user',
        element: <ProtectedRoute rolesAllowed={[Role.ADMIN]} />,
        handle: { title: 'Usuários', requiresLogin: true },
        children: [
          { path: '', element: <UserGrid />, handle: { title: 'Usuários', requiresLogin: true } },
          { path: 'new', element: <UserFormWrapper />, handle: { title: 'Novo Usuário', requiresLogin: true } },
        ]
      },
    ],
  },
  { path: '/login', element: <LoginView /> },
]) as RouteObject[];

export const routes = routing;
export default createBrowserRouter(routes);
