import React, { useState, useEffect } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { useCountry } from 'Frontend/hooks/useCountry'; 
import { Country } from 'Frontend/models/Country'; 
import { State } from 'Frontend/models/State'; 
import { useNavigate } from 'react-router-dom';
import StateForm from './StateForm';
import { deleteStates, getStatesByName } from 'Frontend/util/StateService';
import TextField from '@mui/material/TextField';
import { Notification } from '@hilla/react-components/Notification.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import ActionBar from 'Frontend/components/ActionBar';
import { Button } from '@hilla/react-components/Button.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStates } from 'Frontend/hooks/useStates';

export default function StateGrid() {
  const { states, loading, error, refetch } = useStates();
  const [filteredStates, setFilteredStates] = useState<State[]>([]);
  const [selectedStates, setSelectedStates] = useState<Set<State>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [selectedStateForEdit, setSelectedStateForEdit] = useState<State | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filter, setFilter] = useState('');
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedStatesForDeletion, setSelectedStatesForDeletion] = useState<Set<State>>(new Set());
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
    setFilteredStates(states);
  }, [states]);

  useEffect(() => {
    document.title = showForm ? 'Estado' : 'Estados';
  }, [showForm]);

  const handleFilterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    if (value) {
      const filteredStates = await getStatesByName(value);
      setFilteredStates(filteredStates);
    } else {
      setFilteredStates(states);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const toggleSelection = (state: State) => {
    const newSelection = new Set(selectedStates);
    if (newSelection.has(state)) {
      newSelection.delete(state);
    } else {
      newSelection.add(state);
    }
    setSelectedStates(newSelection);
  };

  const isSelected = (state: State) => selectedStates.has(state);

  const toggleSelectAll = () => {
    if (selectedStates.size === states.length) {
      setSelectedStates(new Set());
    } else {
      setSelectedStates(new Set(states));
    }
  };

  const isAllSelected = selectedStates.size === states.length;

  const openDeleteDialog = () => {
    if (selectedStates.size === 0) {
      toast.warning('Selecione pelo menos um estado para apagar', { theme: 'colored' });
      return;
    }
    setSelectedStatesForDeletion(new Set(selectedStates));
    setDialogOpened(true);
  };

  const handleDeleteSelectedConfirmed = async () => {
    setErrorMessage(null);
    try {
      const selectedStateIds = Array.from(selectedStatesForDeletion)
        .map(state => state.id)
        .filter((id): id is number => id !== undefined);
      await deleteStates(selectedStateIds);
      toast.success('Estado(s) deletado(s) com sucesso!', { theme: 'colored' });
      setSelectedStates(new Set());
      setSelectedStatesForDeletion(new Set());
      setRefreshKey(prev => prev + 1);
      setDialogOpened(false);
      Notification.show('Informações excluídas', {
        theme: "success",
        position: 'top-end',
        duration: 2000,
      });
    } catch (error) {
      toast.error('Erro ao deletar estado(s).', { theme: 'colored' });
    }
  };

  const handleCreateState = () => {
    setSelectedStateForEdit(undefined);
    setShowForm(true);
  };

  const handleEditState = (state: State) => {
    setSelectedStateForEdit(state);
    setShowForm(true);
  };

  const handleUpdateState = () => {
    if (selectedStates.size === 0) {
      toast.warning('Selecione um estado para editar', { theme: 'colored' });
      return;
    } else if (selectedStates.size !== 1) {
      toast.warning('Selecione apenas um estado para edição', { theme: 'colored' });
      return;
    }
    const selectedState = Array.from(selectedStates)[0];
    setSelectedStateForEdit(selectedState);
    setShowForm(true);
  };

  return (
    <React.Fragment>
      {!showForm ? (
        <>
          <ActionBar
            buttons={[
              { label: "Add item", icon: "fa-solid fa-plus", onClick: handleCreateState, tooltipText: "Novo estado", show: true },
              { label: "Update item", icon: "fa-solid fa-pen-to-square", onClick: handleUpdateState, tooltipText: "Atualizar", show: true },
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
              items={filteredStates}
              theme="row-stripes"
              onActiveItemChanged={({ detail: { value } }) => handleEditState(value as State)}
              className='grid-component'
            >
              <GridColumn
                headerRenderer={() => (
                  <Checkbox checked={isAllSelected} onCheckedChanged={toggleSelectAll} />
                )}
                flexGrow={0}
                width="100px"
              >
                {({ item }: { item: State }) => (
                  <Checkbox checked={isSelected(item)} onCheckedChanged={() => toggleSelection(item)} />
                )}
              </GridColumn>
              <GridColumn path="id" header="Id" />
              <GridColumn path="name" header="Nome" />
              <GridColumn path="country.name" header="País" />
            </Grid>
          </section>
        </>
      ) : (
        <StateForm
          onSubmit={() => {
            setShowForm(false);
            toast.success('Estado salvo com sucesso!', { theme: 'colored' });
            setRefreshKey(prev => prev + 1);
          }}
          selectedState={selectedStateForEdit}
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
