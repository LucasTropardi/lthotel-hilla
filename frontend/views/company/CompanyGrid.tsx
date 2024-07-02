import React, { useState, useEffect } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { Company } from 'Frontend/models/Company'; 
import { useNavigate } from 'react-router-dom';
import ComnpanyForm from './CompanyForm';
import { deleteCompanies, getCompaniesByName } from 'Frontend/util/CompanyService';
import TextField from '@mui/material/TextField';
import { Notification } from '@hilla/react-components/Notification.js';
import { Dialog } from '@hilla/react-components/Dialog.js';
import ActionBar from 'Frontend/components/ActionBar';
import { Button } from '@hilla/react-components/Button.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCompany } from 'Frontend/hooks/useCompany';
import CompanyForm from './CompanyForm';

export default function CompanyGrid() {
  const { companies, loading, error, refetch } = useCompany();
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<Set<Company>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [selectedCompanyForEdit, setSelectedCompanyForEdit] = useState<Company | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filter, setFilter] = useState('');
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedCompaniesForDeletion, setSelectedCompaniesForDeletion] = useState<Set<Company>>(new Set());
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
    setFilteredCompanies(companies);
  }, [companies]);

  useEffect(() => {
    document.title = showForm ? 'Empresa' : 'Empresas';
  }, [showForm]);

  const handleFilterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    if (value) {
      const filteredCompanies = await getCompaniesByName(value);
      setFilteredCompanies(filteredCompanies);
    } else {
      setFilteredCompanies(companies);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const toggleSelection = (company: Company) => {
    const newSelection = new Set(selectedCompanies);
    if (newSelection.has(company)) {
      newSelection.delete(company);
    } else {
      newSelection.add(company);
    }
    setSelectedCompanies(newSelection);
  };

  const isSelected = (company: Company) => selectedCompanies.has(company);

  const toggleSelectAll = () => {
    if (selectedCompanies.size === companies.length) {
      setSelectedCompanies(new Set());
    } else {
      setSelectedCompanies(new Set(companies));
    }
  };

  const isAllSelected = selectedCompanies.size === companies.length;

  const openDeleteDialog = () => {
    if (selectedCompanies.size === 0) {
      toast.warning('Selecione pelo menos uma empresa para apagar', { theme: 'colored' });
      return;
    }
    setSelectedCompaniesForDeletion(new Set(selectedCompanies));
    setDialogOpened(true);
  };

  const handleDeleteSelectedConfirmed = async () => {
    setErrorMessage(null);
    try {
      const selectedCompanyIds = Array.from(selectedCompaniesForDeletion)
        .map(company => company.id)
        .filter((id): id is number => id !== undefined);
      await deleteCompanies(selectedCompanyIds);
      toast.success('Empresa(s) deletada(s) com sucesso!', { theme: 'colored' });
      setSelectedCompanies(new Set());
      setSelectedCompaniesForDeletion(new Set());
      setRefreshKey(prev => prev + 1);
      setDialogOpened(false);
      Notification.show('Informações excluídas', {
        theme: "success",
        position: 'top-end',
        duration: 2000,
      });
    } catch (error) {
      toast.error('Erro ao deletar empresa(s).', { theme: 'colored' });
    }
  };

  const handleCreateCompany = () => {
    setSelectedCompanyForEdit(undefined);
    setShowForm(true);
  };

  const handleEditCompany = (company: Company) => {
    setSelectedCompanyForEdit(company);
    setShowForm(true);
  };

  const handleUpdateCompany = () => {
    if (selectedCompanies.size === 0) {
      toast.warning('Selecione uma empresa para editar', { theme: 'colored' });
      return;
    } else if (selectedCompanies.size !== 1) {
      toast.warning('Selecione apenas uma empresa para edição', { theme: 'colored' });
      return;
    }
    const selectedCompany = Array.from(selectedCompanies)[0];
    setSelectedCompanyForEdit(selectedCompany);
    setShowForm(true);
  };

  return (
    <React.Fragment>
      {!showForm ? (
        <>
          <ActionBar
            buttons={[
              { label: "Add item", icon: "fa-solid fa-plus", onClick: handleCreateCompany, tooltipText: "Nova cidade", show: true },
              { label: "Update item", icon: "fa-solid fa-pen-to-square", onClick: handleUpdateCompany, tooltipText: "Atualizar", show: true },
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
              items={filteredCompanies}
              theme="row-stripes"
              onActiveItemChanged={({ detail: { value } }) => handleEditCompany(value as Company)}
              className='grid-component'
            >
              <GridColumn
                headerRenderer={() => (
                  <Checkbox checked={isAllSelected} onCheckedChanged={toggleSelectAll} />
                )}
                flexGrow={0}
                width="70px"
              >
                {({ item }: { item: Company }) => (
                  <Checkbox checked={isSelected(item)} onCheckedChanged={() => toggleSelection(item)} />
                )}
              </GridColumn>
              <GridColumn path="id" header="Id" />
              <GridColumn path="razaoSocial" header="Razão Social" />
              <GridColumn path="fantasia" header="Fantasia" />
              <GridColumn path="cnpj" header="CNPJ" />
              <GridColumn path="city.name" header="Cidade" />
              <GridColumn path="telefone" header="Telefone" />
            </Grid>
          </section>
        </>
      ) : (
        <CompanyForm
          onSubmit={() => {
            setShowForm(false);
            toast.success('Empresa salva com sucesso!', { theme: 'colored' });
            setRefreshKey(prev => prev + 1);
          }}
          selectedCompany={selectedCompanyForEdit}
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
