import React, { useState, useEffect } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { City } from 'Frontend/models/City'; 
import { useNavigate } from 'react-router-dom';
import CityForm from './CityForm';
import { deleteCities, getCitiesByName } from 'Frontend/util/CityService';
import TextField from '@mui/material/TextField';
import { Notification } from '@hilla/react-components/Notification.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import ActionBar from 'Frontend/components/ActionBar';
import { Button } from '@hilla/react-components/Button.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCity } from 'Frontend/hooks/useCity';

export default function CityGrid() {
  const { cities, loading, error, refetch } = useCity();
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedCities, setSelectedCities] = useState<Set<City>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [selectedCityForEdit, setSelectedCityForEdit] = useState<City | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filter, setFilter] = useState('');
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedCitiesForDeletion, setSelectedCitiesForDeletion] = useState<Set<City>>(new Set());
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
    setFilteredCities(cities);
  }, [cities]);

  useEffect(() => {
    document.title = showForm ? 'Cidade' : 'Cidades';
  }, [showForm]);

  const handleFilterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    if (value) {
      const filteredCities = await getCitiesByName(value);
      setFilteredCities(filteredCities);
    } else {
      setFilteredCities(cities);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const toggleSelection = (city: City) => {
    const newSelection = new Set(selectedCities);
    if (newSelection.has(city)) {
      newSelection.delete(city);
    } else {
      newSelection.add(city);
    }
    setSelectedCities(newSelection);
  };

  const isSelected = (city: City) => selectedCities.has(city);

  const toggleSelectAll = () => {
    if (selectedCities.size === cities.length) {
      setSelectedCities(new Set());
    } else {
      setSelectedCities(new Set(cities));
    }
  };

  const isAllSelected = selectedCities.size === cities.length;

  const openDeleteDialog = () => {
    if (selectedCities.size === 0) {
      toast.warning('Selecione pelo menos uma cidade para apagar', { theme: 'colored' });
      return;
    }
    setSelectedCitiesForDeletion(new Set(selectedCities));
    setDialogOpened(true);
  };

  const handleDeleteSelectedConfirmed = async () => {
    setErrorMessage(null);
    try {
      const selectedCityIds = Array.from(selectedCitiesForDeletion)
        .map(city => city.id)
        .filter((id): id is number => id !== undefined);
      await deleteCities(selectedCityIds);
      toast.success('Cidade(s) deletada(s) com sucesso!', { theme: 'colored' });
      setSelectedCities(new Set());
      setSelectedCitiesForDeletion(new Set());
      setRefreshKey(prev => prev + 1);
      setDialogOpened(false);
      Notification.show('Informações excluídas', {
        theme: "success",
        position: 'top-end',
        duration: 2000,
      });
    } catch (error) {
      toast.error('Erro ao deletar cidade(s).', { theme: 'colored' });
    }
  };

  const handleCreateCity = () => {
    setSelectedCityForEdit(undefined);
    setShowForm(true);
  };

  const handleEditCity = (city: City) => {
    setSelectedCityForEdit(city);
    setShowForm(true);
  };

  const handleUpdateCity = () => {
    if (selectedCities.size === 0) {
      toast.warning('Selecione uma cidade para editar', { theme: 'colored' });
      return;
    } else if (selectedCities.size !== 1) {
      toast.warning('Selecione apenas uma cidade para edição', { theme: 'colored' });
      return;
    }
    const selectedCity = Array.from(selectedCities)[0];
    setSelectedCityForEdit(selectedCity);
    setShowForm(true);
  };

  return (
    <React.Fragment>
      {!showForm ? (
        <>
          <ActionBar
            buttons={[
              { label: "Add item", icon: "fa-solid fa-plus", onClick: handleCreateCity, tooltipText: "Nova cidade", show: true },
              { label: "Update item", icon: "fa-solid fa-pen-to-square", onClick: handleUpdateCity, tooltipText: "Atualizar", show: true },
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
              items={filteredCities}
              theme="row-stripes"
              onActiveItemChanged={({ detail: { value } }) => handleEditCity(value as City)}
              className='grid-component'
            >
              <GridColumn
                headerRenderer={() => (
                  <Checkbox checked={isAllSelected} onCheckedChanged={toggleSelectAll} />
                )}
                flexGrow={0}
                width="100px"
              >
                {({ item }: { item: City }) => (
                  <Checkbox checked={isSelected(item)} onCheckedChanged={() => toggleSelection(item)} />
                )}
              </GridColumn>
              <GridColumn path="id" header="Id" />
              <GridColumn path="name" header="Nome" />
              <GridColumn path="state.name" header="Estado" />
            </Grid>
          </section>
        </>
      ) : (
        <CityForm
          onSubmit={() => {
            setShowForm(false);
            toast.success('Cidade salva com sucesso!', { theme: 'colored' });
            setRefreshKey(prev => prev + 1);
          }}
          selectedCity={selectedCityForEdit}
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
