import React, { useState, useEffect } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { useUser } from 'Frontend/hooks/useUser';
import { User } from 'Frontend/models/User';
import { Button } from '@hilla/react-components/Button.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUsers } from 'Frontend/util/UserService';
import { Notification } from '@hilla/react-components/Notification.js';

export default function UserGrid() {
  const { users, loading, error, refetch } = useUser();
  const [selectedUsers, setSelectedUsers] = useState<Set<User>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!showForm) {
      setRefreshKey(prev => prev + 1); 
    }
  }, [showForm]);

  useEffect(() => {
    if (refetch) refetch();
  }, [refreshKey]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const toggleSelection = (user: User) => {
    const newSelection = new Set(selectedUsers);
    if (newSelection.has(user)) {
      newSelection.delete(user);
    } else {
      newSelection.add(user);
    }
    setSelectedUsers(newSelection);
  };

  const isSelected = (user: User) => selectedUsers.has(user);

  const toggleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users));
    }
  };

  const isAllSelected = selectedUsers.size === users.length;

  const handleDeleteSelected = async () => {
    if (selectedUsers.size === 0) {
      setErrorMessage('Selecione pelo menos um usuário para deletar.');
      return;
    }
    setErrorMessage(null);
    try {
      const selectedUserIds = Array.from(selectedUsers).map(user => user.id);
      await deleteUsers(selectedUserIds);
      toast.success('Usuários deletados com sucesso!', { theme: 'colored' });
      setSelectedUsers(new Set());
      setRefreshKey(prev => prev + 1);
      Notification.show('Informações excluídas', {
        theme: "success",
        position: 'top-end',
        duration: 2000,
      });
    } catch (error) {
      toast.error('Erro ao deletar usuários.', { theme: 'colored' });
    }
  };

  const handleCreateUser = () => {
    setSelectedUserForEdit(undefined);
    setShowForm(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUserForEdit(user);
    setShowForm(true);
  };

  const handleUpdateUser = () => {
    if (selectedUsers.size !== 1) {
      setErrorMessage('Selecione exatamente um usuário para editar.');
      return;
    }
    const selectedUser = Array.from(selectedUsers)[0];
    setSelectedUserForEdit(selectedUser);
    setShowForm(true);
  };

  return (
    <React.Fragment>
      {showForm ? (
        <UserForm
          onSubmit={() => {
            setShowForm(false);
            toast.success('Usuário salvo com sucesso!', { theme: 'colored' });
            setRefreshKey(prev => prev + 1);
          }}
          selectedUser={selectedUserForEdit}
        />
      ) : (
        <>
          <section className="actions">
            <Button theme="icon" aria-label="Add item" className='button' onClick={handleCreateUser}>
              <Tooltip slot="tooltip" text="Novo usuário" />
              <Icon className='fa-solid fa-plus' />
            </Button>
            <Button theme="icon" aria-label="Update item" className='button' onClick={handleUpdateUser}>
              <Tooltip slot="tooltip" text="Atualizar" />
              <Icon className='fa-solid fa-pen-to-square' />
            </Button>
            <Button theme="icon" aria-label="Delete item" className='button' onClick={handleDeleteSelected}>
              <Tooltip slot="tooltip" text="Excluir" />
              <Icon className='fa-regular fa-trash-can' />
            </Button>
          </section>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <section className="grid-container">
            <Grid
              items={users}
              theme="row-stripes"
              onActiveItemChanged={({ detail: { value } }) => handleEditUser(value as User)}
            >
              <GridColumn
                headerRenderer={() => (
                  <Checkbox checked={isAllSelected} onCheckedChanged={toggleSelectAll} />
                )}
                flexGrow={0}
                width="100px"
              >
                {({ item }: { item: User }) => (
                  <Checkbox checked={isSelected(item)} onCheckedChanged={() => toggleSelection(item)} />
                )}
              </GridColumn>
              <GridColumn path="username" header="Usuário" />
              <GridColumn path="name" header="Nome" />
              <GridColumn header="Roles">
                {({ item }: { item: User }) => (
                  <span>{Array.from(item.roles).join(', ')}</span>
                )}
              </GridColumn>
            </Grid>
          </section>
          <ToastContainer />
        </>
      )}
    </React.Fragment>
  );
}
