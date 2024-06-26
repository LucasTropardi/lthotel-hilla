import React, { useState, useEffect } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { useCountry } from 'Frontend/hooks/useCountry'; 
import { Country } from 'Frontend/models/Country'; 
import { useNavigate } from 'react-router-dom';
import CountryForm from './CountryForm';
import { deleteCountries, getCountriesByName } from 'Frontend/util/CountryService';
import TextField from '@mui/material/TextField';
import { Notification } from '@hilla/react-components/Notification.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import ActionBar from 'Frontend/components/ActionBar';
import { Button } from '@hilla/react-components/Button.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CountryGrid() {
  const { countries, loading, error, refetch } = useCountry();
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Set<Country>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [selectedCountryForEdit, setSelectedCountryForEdit] = useState<Country | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filter, setFilter] = useState('');
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedCountriesForDeletion, setSelectedCountriesForDeletion] = useState<Set<Country>>(new Set());
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
    setFilteredCountries(countries);
  }, [countries]);

  useEffect(() => {
    document.title = showForm ? 'País' : 'Países';
  }, [showForm]);

  const handleFilterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    if (value) {
      const filteredCountries = await getCountriesByName(value);
      setFilteredCountries(filteredCountries);
    } else {
      setFilteredCountries(countries);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const toggleSelection = (country: Country) => {
    const newSelection = new Set(selectedCountries);
    if (newSelection.has(country)) {
      newSelection.delete(country);
    } else {
      newSelection.add(country);
    }
    setSelectedCountries(newSelection);
  };

  const isSelected = (country: Country) => selectedCountries.has(country);

  const toggleSelectAll = () => {
    if (selectedCountries.size === countries.length) {
      setSelectedCountries(new Set());
    } else {
      setSelectedCountries(new Set(countries));
    }
  };

  const isAllSelected = selectedCountries.size === countries.length;

  const openDeleteDialog = () => {
    if (selectedCountries.size === 0) {
      toast.warning('Selecione pelo menos um país para apagar', { theme: 'colored' });
      return;
    }
    setSelectedCountriesForDeletion(new Set(selectedCountries));
    setDialogOpened(true);
  };

  const handleDeleteSelectedConfirmed = async () => {
    setErrorMessage(null);
    try {
      const selectedCountryIds = Array.from(selectedCountriesForDeletion)
        .map(country => country.id)
        .filter((id): id is number => id !== undefined);
      await deleteCountries(selectedCountryIds);
      toast.success('Países deletados com sucesso!', { theme: 'colored' });
      setSelectedCountries(new Set());
      setSelectedCountriesForDeletion(new Set());
      setRefreshKey(prev => prev + 1);
      setDialogOpened(false);
      Notification.show('Informações excluídas', {
        theme: "success",
        position: 'top-end',
        duration: 2000,
      });
    } catch (error) {
      toast.error('Erro ao deletar países.', { theme: 'colored' });
    }
  };

  const handleCreateCountry = () => {
    setSelectedCountryForEdit(undefined);
    setShowForm(true);
  };

  const handleEditCountry = (country: Country) => {
    setSelectedCountryForEdit(country);
    setShowForm(true);
  };

  const handleUpdateCountry = () => {
    if (selectedCountries.size === 0) {
      toast.warning('Selecione um país para editar', { theme: 'colored' });
      return;
    } else if (selectedCountries.size !== 1) {
      toast.warning('Selecione apenas um país para edição', { theme: 'colored' });
      return;
    }
    const selectedCountry = Array.from(selectedCountries)[0];
    setSelectedCountryForEdit(selectedCountry);
    setShowForm(true);
  };

  return (
    <React.Fragment>
      {!showForm ? (
        <>
          <ActionBar
            buttons={[
              { label: "Add item", icon: "fa-solid fa-plus", onClick: handleCreateCountry, tooltipText: "Novo país", show: true },
              { label: "Update item", icon: "fa-solid fa-pen-to-square", onClick: handleUpdateCountry, tooltipText: "Atualizar", show: true },
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
              items={filteredCountries}
              theme="row-stripes"
              onActiveItemChanged={({ detail: { value } }) => handleEditCountry(value as Country)}
              className='grid-component'
            >
              <GridColumn
                headerRenderer={() => (
                  <Checkbox checked={isAllSelected} onCheckedChanged={toggleSelectAll} />
                )}
                flexGrow={0}
                width="100px"
              >
                {({ item }: { item: Country }) => (
                  <Checkbox checked={isSelected(item)} onCheckedChanged={() => toggleSelection(item)} />
                )}
              </GridColumn>
              <GridColumn path="id" header="Id" />
              <GridColumn path="name" header="Nome" />
              <GridColumn path="nationality" header="Nacionalidade" />
            </Grid>
          </section>
        </>
      ) : (
        <CountryForm
          onSubmit={() => {
            setShowForm(false);
            toast.success('País salvo com sucesso!', { theme: 'colored' });
            setRefreshKey(prev => prev + 1);
          }}
          selectedCountry={selectedCountryForEdit}
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
