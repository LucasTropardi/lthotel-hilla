import React, { useState, useEffect } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { Guest } from 'Frontend/models/Guest'; 
import { useNavigate } from 'react-router-dom';
import { deleteGuests, getGuestsByName } from 'Frontend/util/GuestService';
import TextField from '@mui/material/TextField';
import { Notification } from '@hilla/react-components/Notification.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import ActionBar from 'Frontend/components/ActionBar';
import { Button } from '@hilla/react-components/Button.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGuest } from 'Frontend/hooks/useGuest';
import GuestForm from './GuestForm';
// import { formatCNPJ } from 'Frontend/util/masks';

export default function GuestGrid() {
  const { guests, loading, error, refetch } = useGuest();
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [selectedGuests, setSelectedGuests] = useState<Set<Guest>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [selectedGuestForEdit, setSelectedGuestForEdit] = useState<Guest | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filter, setFilter] = useState('');
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedGuestsForDeletion, setSelectedGuestsForDeletion] = useState<Set<Guest>>(new Set());
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
    setFilteredGuests(guests);
  }, [guests]);

  useEffect(() => {
    document.title = showForm ? 'Hóspede' : 'Hóspedes';
  }, [showForm]);

  const handleFilterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    if (value) {
      const filteredGuests = await getGuestsByName(value);
      setFilteredGuests(filteredGuests);
    } else {
      setFilteredGuests(guests);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const toggleSelection = (guest: Guest) => {
    const newSelection = new Set(selectedGuests);
    if (newSelection.has(guest)) {
      newSelection.delete(guest);
    } else {
      newSelection.add(guest);
    }
    setSelectedGuests(newSelection);
  };

  const isSelected = (guest: Guest) => selectedGuests.has(guest);

  const toggleSelectAll = () => {
    if (selectedGuests.size === guests.length) {
      setSelectedGuests(new Set());
    } else {
      setSelectedGuests(new Set(guests));
    }
  };

  const isAllSelected = selectedGuests.size === guests.length;

  const openDeleteDialog = () => {
    if (selectedGuests.size === 0) {
      toast.warning('Selecione pelo menos um hóspede para apagar', { theme: 'colored' });
      return;
    }
    setSelectedGuestsForDeletion(new Set(selectedGuests));
    setDialogOpened(true);
  };

  const handleDeleteSelectedConfirmed = async () => {
    setErrorMessage(null);
    try {
      const selectedGuestIds = Array.from(selectedGuestsForDeletion)
        .map(guest => guest.id)
        .filter((id): id is number => id !== undefined);
      await deleteGuests(selectedGuestIds);
      toast.success('Hóspede(s) deletado(s) com sucesso!', { theme: 'colored' });
      setSelectedGuests(new Set());
      setSelectedGuestsForDeletion(new Set());
      setRefreshKey(prev => prev + 1);
      setDialogOpened(false);
      Notification.show('Informações excluídas', {
        theme: "success",
        position: 'top-end',
        duration: 2000,
      });
    } catch (error) {
      toast.error('Erro ao deletar hóspede(s).', { theme: 'colored' });
    }
  };

  const handleCreateGuest = () => {
    setSelectedGuestForEdit(undefined);
    setShowForm(true);
  };

  const handleEditGuest = (guest: Guest) => {
    setSelectedGuestForEdit(guest);
    setShowForm(true);
  };

  const handleUpdateGuest = () => {
    if (selectedGuests.size === 0) {
      toast.warning('Selecione um hóspede para editar', { theme: 'colored' });
      return;
    } else if (selectedGuests.size !== 1) {
      toast.warning('Selecione apenas um hóspede para edição', { theme: 'colored' });
      return;
    }
    const selectedGuest = Array.from(selectedGuests)[0];
    setSelectedGuestForEdit(selectedGuest);
    setShowForm(true);
  };

  return (
    <React.Fragment>
      {!showForm ? (
        <>
          <ActionBar
            buttons={[
              { label: "Add item", icon: "fa-solid fa-plus", onClick: handleCreateGuest, tooltipText: "Novo hóspede", show: true },
              { label: "Update item", icon: "fa-solid fa-pen-to-square", onClick: handleUpdateGuest, tooltipText: "Atualizar", show: true },
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
              items={filteredGuests}
              theme="row-stripes"
              onActiveItemChanged={({ detail: { value } }) => handleEditGuest(value as Guest)}
              className='grid-component'
            >
              <GridColumn
                headerRenderer={() => (
                  <Checkbox checked={isAllSelected} onCheckedChanged={toggleSelectAll} />
                )}
                flexGrow={0}
                width="70px"
              >
                {({ item }: { item: Guest }) => (
                  <Checkbox checked={isSelected(item)} onCheckedChanged={() => toggleSelection(item)} />
                )}
              </GridColumn>
              <GridColumn path="id" header="Id" />
              <GridColumn
                header="Nome completo"
                renderer={({ item }) => (
                  <span>{`${item.name} ${item.lastname}`}</span>
                )}
              />
              <GridColumn path="cellPhone" header="Celular" />
              <GridColumn path="email" header="E-mail" />
              <GridColumn path="country.nationality" header="Nacionalidade" />
            </Grid>
          </section>
        </>
      ) : (
        <GuestForm
          onSubmit={() => {
            setShowForm(false);
            toast.success('Hóspede salvo com sucesso!', { theme: 'colored' });
            setRefreshKey(prev => prev + 1);
          }}
          selectedGuest={selectedGuestForEdit}
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
