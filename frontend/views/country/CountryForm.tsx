import React, { useState, useEffect, FormEvent } from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { useNavigate } from 'react-router-dom';
import { createCountry, updateCountry } from 'Frontend/util/CountryService';
import { Country } from 'Frontend/models/Country';
import TextField from '@mui/material/TextField';
import { ErrorWithMessage } from 'Frontend/types/ErrorTypes';
import ActionBar from 'Frontend/components/ActionBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CountryFormProps {
  onSubmit: () => void;
  selectedCountry?: Country;
}

export default function CountryForm({ onSubmit, selectedCountry }: CountryFormProps) {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');

  useEffect(() => {
    if (selectedCountry) {
      setName(selectedCountry.name || '');
      setNationality(selectedCountry.nationality || '');
    }
  }, [selectedCountry]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newCountry: Omit<Country, 'id'> = {
      name,
      nationality
    };

    try {
      if (selectedCountry) {
        await updateCountry({ ...selectedCountry, name, nationality });
      } else {
        await createCountry(newCountry);
      }
      onSubmit();
      navigate('/country');
      toast.success('Informações salvas', { theme: 'colored' });
    } catch (error) {
      const e = error as ErrorWithMessage;
      if (e.message === 'Duplicate entry for country name.') {
        toast.error('Erro: Nome do país duplicado.', { theme: 'colored' });
      } else {
        toast.error('Erro ao salvar país.', { theme: 'colored' });
      }
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
    navigate('/country');
  };

  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '500px', columns: 2 },
  ];

  return (
    <React.Fragment>
      <ActionBar
        buttons={[
          { label: "Save", icon: "fa-solid fa-check", onClick: handleSubmit as any, tooltipText: "Salvar", show: true },
          { label: "Cancel", icon: "fa-solid fa-xmark", onClick: handleCancel, tooltipText: "Cancelar", show: true }
        ]}
      />
      <section className="form-container">
        <FormLayout responsiveSteps={responsiveSteps} className='form-layout'>
          <TextField
            label="Nome"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
            fullWidth
            className="input-field"
          />
          <TextField
            label="Nacionalidade"
            value={nationality}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNationality(e.target.value)}
            required
            fullWidth
            className="input-field"
          />
        </FormLayout>
      </section>
      <ToastContainer />
    </React.Fragment>
  );
}
