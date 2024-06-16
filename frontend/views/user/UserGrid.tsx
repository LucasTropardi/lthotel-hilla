import React, { useState, useEffect } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { useUser } from 'Frontend/hooks/useUser';
import { User } from 'Frontend/models/User';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';
import { deleteUsers, getUsersByName } from 'Frontend/util/UserService';
import TextField from '@mui/material/TextField';
import { Notification } from '@hilla/react-components/Notification.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import ActionBar from 'Frontend/components/ActionBar';
import { Button } from '@hilla/react-components/Button.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserGrid() {
  const { users, loading, error, refetch } = useUser();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<User>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filter, setFilter] = useState('');
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedUsersForDeletion, setSelectedUsersForDeletion] = useState<Set<User>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    if (!showForm) {
      setRefreshKey(prev => prev + 1); 
    }
  }, [showForm]);

  useEffect(() => {
    if (refetch) refetch();
  }, [refreshKey]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    document.title = showForm ? 'Usuário' : 'Usuários';
  }, [showForm]);

  const handleFilterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    if (value) {
      const filteredUsers = await getUsersByName(value);
      setFilteredUsers(filteredUsers);
    } else {
      setFilteredUsers(users);
    }
  };

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

  const openDeleteDialog = () => {
    if (selectedUsers.size === 0) {
      toast.warning('Selecione pelo menos um usuário para apagar', { theme: 'colored' });
      return;
    }
    setSelectedUsersForDeletion(new Set(selectedUsers));
    setDialogOpened(true);
  };

  const handleDeleteSelectedConfirmed = async () => {
    setErrorMessage(null);
    try {
      const selectedUserIds = Array.from(selectedUsersForDeletion).map(user => user.id);
      await deleteUsers(selectedUserIds);
      toast.success('Usuários deletados com sucesso!', { theme: 'colored' });
      setSelectedUsers(new Set());
      setSelectedUsersForDeletion(new Set());
      setRefreshKey(prev => prev + 1);
      setDialogOpened(false);
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
    if (selectedUsers.size === 0) {
      toast.warning('Selecione um usuário para editar', { theme: 'colored' });
      return;
    } else if (selectedUsers.size !== 1) {
      toast.warning('Selecione apenas um usuário para edição', { theme: 'colored' });
      return;
    }
    const selectedUser = Array.from(selectedUsers)[0];
    setSelectedUserForEdit(selectedUser);
    setShowForm(true);
  };

  return (
    <React.Fragment>
      {!showForm ? (
        <>
          <ActionBar
            buttons={[
              { label: "Add item", icon: "fa-solid fa-plus", onClick: handleCreateUser, tooltipText: "Novo usuário", show: true },
              { label: "Update item", icon: "fa-solid fa-pen-to-square", onClick: handleUpdateUser, tooltipText: "Atualizar", show: true },
              { label: "Delete item", icon: "fa-regular fa-trash-can", onClick: openDeleteDialog, tooltipText: "Excluir", show: true }
            ]}
          />
          <section className="grid-container">
            <div className='div-search'>
              <TextField
                label="Filtrar por nome"
                value={filter}
                onChange={handleFilterChange}
                fullWidth
                className=""
              />
            </div>
            <Grid
              items={filteredUsers}
              theme="row-stripes"
              onActiveItemChanged={({ detail: { value } }) => handleEditUser(value as User)}
              className='grid-component'
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
        </>
      ) : (
        <UserForm
          onSubmit={() => {
            setShowForm(false);
            toast.success('Usuário salvo com sucesso!', { theme: 'colored' });
            setRefreshKey(prev => prev + 1);
          }}
          selectedUser={selectedUserForEdit}
        />
      )}
      <ToastContainer />

      <Dialog
        headerTitle="Deseja realmente apagar os dados selecionados?"
        opened={dialogOpened}
        onOpenedChanged={(event) => setDialogOpened(event.detail.value)}
        footerRenderer={() => (
          <div className="button-container">
            <Button theme="tertiary" onClick={() => setDialogOpened(false)}>Cancelar</Button>
            <Button theme="primary error" onClick={handleDeleteSelectedConfirmed}>Sim</Button>
          </div>
        )}
      >
      </Dialog>
    </React.Fragment>
  );
}
