import { protectRoutes } from '@hilla/react-auth';
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
import Dashboard from './views/dashboard/Dashboard';
import CompanyGrid from './views/company/CompanyGrid';
import GuestGrid from './views/guest/GuestGrid';

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
      { path: '/', element: <Dashboard />, handle: { title: 'Dashboard', requiresLogin: true } },
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
      {
        path: '/company',
        element: <ProtectedRoute rolesAllowed={[Role.ADMIN, Role.USER]} />,
        handle: { title: 'Empresas', requiresLogin: true },
        children: [
          { path: '', element: <CompanyGrid />, handle: { title: 'Cadastro de empresas', requiresLogin: true } },
        ]
      },
      {
        path: '/guest',
        element: <ProtectedRoute rolesAllowed={[Role.ADMIN, Role.USER]} />,
        handle: { title: 'Hóspedes', requiresLogin: true },
        children: [
          { path: '', element: <GuestGrid />, handle: { title: 'Cadastro de hóspedes', requiresLogin: true } },
        ]
      },
    ],
  },
  { path: '/login', element: <LoginView /> },
]) as RouteObject[];

export const routes = routing;
export default createBrowserRouter(routes);
