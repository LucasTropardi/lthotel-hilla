import React, { useState, useEffect, FormEvent } from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { useNavigate } from 'react-router-dom';
import { createState, updateState } from 'Frontend/util/StateService';
import { Country } from 'Frontend/models/Country';
import { State } from 'Frontend/models/State';
import { getCountries } from 'Frontend/util/CountryService';
import TextField from '@mui/material/TextField';
import Select from 'react-select';
import { ErrorWithMessage } from 'Frontend/types/ErrorTypes';
import ActionBar from 'Frontend/components/ActionBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface StateFormProps {
  onSubmit: () => void;
  selectedState?: State;
}

export default function StateForm({ onSubmit, selectedState }: StateFormProps) {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [country, setCountry] = useState<Country | null>(null); 
  const [countries, setCountries] = useState<Country[]>([]); 

  useEffect(() => {
    const loadFormData = async () => {
      const loadedCountries = await getCountries();
      setCountries(loadedCountries);
      
      if (selectedState) {
        setName(selectedState.name || '');
        if (selectedState.country) {
          const selectedCountry = loadedCountries.find(c => c.id === selectedState.country?.id);
          setCountry(selectedCountry || null);
        }
      }
    };

    loadFormData();
  }, [selectedState]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newState: Omit<State, 'id'> = {
      name,
      country: country as Country
    };

    try {
      if (selectedState) {
        await updateState({ ...selectedState, name, country: country as Country });
      } else {
        await createState(newState);
      }
      onSubmit();
      navigate('/state');
      toast.success('Informações salvas', { theme: 'colored' });
    } catch (error) {
      const e = error as ErrorWithMessage;
      if (e.message === 'Duplicate entry for state name.') {
        toast.error('Erro: Nome do estado duplicado.', { theme: 'colored' });
      } else {
        toast.error('Erro ao salvar estado.', { theme: 'colored' });
      }
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
    navigate('/state');
  };

  const handleCountryChange = (selectedOption: any) => {
    setCountry(selectedOption ? selectedOption.value : null);
  };

  const countryOptions = countries.map(country => ({
    value: country,
    label: country.name
  }));

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
          <Select
            placeholder="País"
            name="country"
            options={countryOptions}
            className="single-select"
            classNamePrefix="select"
            value={countryOptions.find(option => option.value.id === country?.id)}
            onChange={handleCountryChange}
            styles={{ control: (provided) => ({ ...provided, width: '100%', marginTop: '16px', marginBottom: '16px', padding: '8px' }) }}
          />
        </FormLayout>
      </section>
      <ToastContainer />
    </React.Fragment>
  );
}
