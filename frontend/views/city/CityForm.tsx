import React, { useState, useEffect, FormEvent } from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { useNavigate } from 'react-router-dom';
import { createCity, updateCity } from 'Frontend/util/CityService';
import { City } from 'Frontend/models/City';
import { State } from 'Frontend/models/State';
import { getStates } from 'Frontend/util/StateService';
import TextField from '@mui/material/TextField';
import Select from 'react-select';
import { ErrorWithMessage } from 'Frontend/types/ErrorTypes';
import ActionBar from 'Frontend/components/ActionBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CityFormProps {
  onSubmit: () => void;
  selectedCity?: City;
}

export default function CityForm({ onSubmit, selectedCity }: CityFormProps) {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [state, setState] = useState<State | null>(null); 
  const [states, setStates] = useState<State[]>([]); 

  useEffect(() => {
    const loadFormData = async () => {
      const loadedStates = await getStates();
      setStates(loadedStates);
      
      if (selectedCity) {
        setName(selectedCity.name || '');
        if (selectedCity.state) {
          const selectedState = loadedStates.find(s => s.id === selectedCity.state?.id);
          setState(selectedState || null);
        }
      }
    };

    loadFormData();
  }, [selectedCity]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newCity: Omit<City, 'id'> = {
      name,
      state: state as State
    };

    try {
      if (selectedCity) {
        await updateCity({ ...selectedCity, name, state: state as State });
      } else {
        await createCity(newCity);
      }
      onSubmit();
      navigate('/city');
      toast.success('Informações salvas', { theme: 'colored' });
    } catch (error) {
      const e = error as ErrorWithMessage;
      if (e.message === 'Duplicate entry for city name.') {
        toast.error('Erro: Nome da cidade duplicado.', { theme: 'colored' });
      } else {
        toast.error('Erro ao salvar cidade.', { theme: 'colored' });
      }
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
    navigate('/city');
  };

  const handleStateChange = (selectedOption: any) => {
    setState(selectedOption ? selectedOption.value : null);
  };

  const stateOptions = states.map(state => ({
    value: state,
    label: state.name
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
            placeholder="Estado"
            name="state"
            options={stateOptions}
            className="single-select"
            classNamePrefix="select"
            value={stateOptions.find(option => option.value.id === state?.id)}
            onChange={handleStateChange}
            styles={{ control: (provided) => ({ ...provided, width: '100%', marginTop: '16px', marginBottom: '16px', padding: '8px' }) }}
          />
        </FormLayout>
      </section>
      <ToastContainer />
    </React.Fragment>
  );
}
