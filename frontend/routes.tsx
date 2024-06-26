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
import CountryGrid from './views/country/CountryGrid';
import StateGrid from './views/state/StateGrid';
import CityGrid from './views/city/CityGrid';

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
          { path: '', element: <UserGrid />, handle: { title: 'Gerenciamento de usuários', requiresLogin: true } },
        ]
      },
      {
        path: '/country',
        element: <ProtectedRoute rolesAllowed={[Role.ADMIN, Role.USER]} />,
        handle: { title: 'Países', requiresLogin: true },
        children: [
          { path: '', element: <CountryGrid />, handle: { title: 'Cadastro de países', requiresLogin: true } },
        ]
      },
      {
        path: '/state',
        element: <ProtectedRoute rolesAllowed={[Role.ADMIN, Role.USER]} />,
        handle: { title: 'Estados', requiresLogin: true },
        children: [
          { path: '', element: <StateGrid />, handle: { title: 'Cadastro de estados', requiresLogin: true } },
        ]
      },
      {
        path: '/city',
        element: <ProtectedRoute rolesAllowed={[Role.ADMIN, Role.USER]} />,
        handle: { title: 'Cidades', requiresLogin: true },
        children: [
          { path: '', element: <CityGrid />, handle: { title: 'Cadastro de cidades', requiresLogin: true } },
        ]
      },
    ],
  },
  { path: '/login', element: <LoginView /> },
]) as RouteObject[];

export const routes = routing;
export default createBrowserRouter(routes);
