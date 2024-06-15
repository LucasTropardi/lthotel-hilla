import React, { useState, useEffect, Suspense } from 'react';
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { Avatar } from '@hilla/react-components/Avatar.js';
import { Button } from '@hilla/react-components/Button.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import { useAuth } from 'Frontend/util/auth.js';
import { useRouteMetadata } from 'Frontend/util/routing.js';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Dialog } from '@hilla/react-components/Dialog.js';
import { Role } from 'Frontend/models/Role';

const navLinkClasses = ({ isActive }: any) => {
  return `block rounded-m p-s ${isActive ? 'bg-primary-10 text-primary' : 'text-body'}`;
};

export default function MainLayout() {
  const currentTitle = useRouteMetadata()?.title ?? 'My App';
  useEffect(() => {
    document.title = currentTitle;
  }, [currentTitle]);

  const { state, logout } = useAuth();
  const profilePictureUrl =
    state.user &&
    `data:image;base64,${btoa(
      state.user.profilePicture.reduce((str, n) => str + String.fromCharCode((n + 256) % 256), ''),
    )}`;

  // Verificar se o usuário é admin
  const isAdmin = state.user?.roles.includes(Role.ADMIN);

  // Estado para controlar o diálogo de confirmação
  const [dialogOpened, setDialogOpened] = useState(false);

  const handleLogout = async () => {
    await logout();
    document.location.reload();
  };

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <img style={{ width: '200px' }} src="images/PMS-LT.png" />
          <nav>
            {state.user ? (
              <NavLink className={navLinkClasses} to="/">
                Hello World
              </NavLink>
            ) : null}
            {state.user ? (
              <NavLink className={navLinkClasses} to="/about">
                About
              </NavLink>
            ) : null}
            {isAdmin ? (
              <NavLink className={navLinkClasses} to="/user">
                Usuários
              </NavLink>
            ) : null}
          </nav>
        </header>
        <footer className="flex flex-col gap-s">
          {state.user ? (
            <>
              <div className="flex items-center gap-s nome-user">
                {state.user.name}
              </div>
              <Button onClick={() => setDialogOpened(true)}>
                Sair
              </Button>
            </>
          ) : (
            <Link to="/login">Sign in</Link>
          )}
        </footer>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h1 slot="navbar" className="text-l m-0">
        {currentTitle}
      </h1>

      <Suspense>
        <Outlet />
      </Suspense>

      {/* Diálogo de confirmação de logout */}
      <Dialog
        opened={dialogOpened}
        onOpenedChanged={(event) => setDialogOpened(event.detail.value)}
      >
        <div className="confirm-logout">
          <span className="confirm-message">Tem certeza de que deseja sair?</span>
          <div className="button-container">
            <Button theme="tertiary" onClick={() => setDialogOpened(false)}>Cancelar</Button>
            <Button theme="primary error" onClick={handleLogout}>Sim</Button>
          </div>
        </div>
      </Dialog>
    </AppLayout>
  );
}
