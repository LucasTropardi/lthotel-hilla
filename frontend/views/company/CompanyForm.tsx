import React, { useState, useEffect, FormEvent } from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { useNavigate } from 'react-router-dom';
import { createCompany, updateCompany } from 'Frontend/util/CompanyService';
import { City } from 'Frontend/models/City';
import { Company, validateCNPJ } from 'Frontend/models/Company';
import { getCompanies } from 'Frontend/util/CompanyService';
import TextField from '@mui/material/TextField';
import Select from 'react-select';
import { ErrorWithMessage } from 'Frontend/types/ErrorTypes';
import ActionBar from 'Frontend/components/ActionBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCities } from 'Frontend/util/CityService';
import { formatCNPJ, formatPhoneNumber, formatInscricaoEstadual } from 'Frontend/util/masks';

interface CompanyFormProps {
  onSubmit: () => void;
  selectedCompany?: Company;
}

export default function CompanyForm({ onSubmit, selectedCompany }: CompanyFormProps) {
  const navigate = useNavigate();
  const [razaoSocial, setRazaoSocial] = useState<string>('');
  const [inscricaoEstadual, setInscricaoEstadual] = useState<string>('');
  const [fantasia, setFantasia] = useState<string>('');
  const [cnpj, setCnpj] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [email, setEmail] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [cnpjError, setCnpjError] = useState<string | null>(null);

  useEffect(() => {
    const loadFormData = async () => {
      const loadedCities = await getCities();
      setCities(loadedCities);
      
      if (selectedCompany) {
        setRazaoSocial(selectedCompany.razaoSocial || '');
        setInscricaoEstadual(selectedCompany.inscricaoEstadual || '');
        setFantasia(selectedCompany.fantasia || '');
        setCnpj(selectedCompany.cnpj || '');
        setAddress(selectedCompany.address || '');
        setEmail(selectedCompany.email || '');
        setTelefone(selectedCompany.telefone || '');

        if (selectedCompany.city) {
          const selectedCity = loadedCities.find(city => city.id === selectedCompany.city?.id);
          setCity(selectedCity || null);
        }
      }
    };

    loadFormData();
  }, [selectedCompany]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const cnpjUnformatted = cnpj.replace(/[^\d]+/g, '');

    if (!validateCNPJ(cnpjUnformatted)) {
      setCnpjError('CNPJ inválido');
      return;
    }

    const newCompany: Omit<Company, 'id'> = {
      razaoSocial,
      inscricaoEstadual,
      fantasia,
      cnpj: cnpjUnformatted,
      address,
      city: city as City,
      email,
      telefone
    };

    try {
      if (selectedCompany) {
        await updateCompany({ ...selectedCompany, razaoSocial, inscricaoEstadual, fantasia, cnpj: cnpjUnformatted, address, email, telefone, city: city as City });
      } else {
        await createCompany(newCompany);
      }
      onSubmit();
      navigate('/company');
      toast.success('Informações salvas', { theme: 'colored' });
    } catch (error) {
      const e = error as ErrorWithMessage;
      if (e.message === 'Duplicate entry for cnpj value.') {
        toast.error('Erro: CNPJ Já cadastrado.', { theme: 'colored' });
      } else {
        toast.error('Erro ao salvar empresa.', { theme: 'colored' });
      }
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
    navigate('/company');
  };

  const handleCityChange = (selectedOption: any) => {
    setCity(selectedOption ? selectedOption.value : null);
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = formatCNPJ(e.target.value);
    setCnpj(formattedCNPJ);
    if (cnpjError) {
      setCnpjError(null);
    }
  };

  const handleInscricaoEstadualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedInscricaoEstadual = formatInscricaoEstadual(e.target.value);
    setInscricaoEstadual(formattedInscricaoEstadual);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setTelefone(formattedPhoneNumber);
  };

  const cityOptions = cities.map(city => ({
    value: city,
    label: city.name
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
            label="Razão Social"
            value={razaoSocial}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRazaoSocial(e.target.value)}
            required
            fullWidth
            className="input-field"
          />
          <TextField
            label="Inscrição estadual"
            value={inscricaoEstadual}
            onChange={handleInscricaoEstadualChange}
            required
            fullWidth
            className="input-field"
            inputProps={{ maxLength: 14 }}
          />
          <TextField
            label="Fantasia"
            value={fantasia}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFantasia(e.target.value)}
            required
            fullWidth
            className="input-field"
          />
          <TextField
            label="CNPJ"
            value={cnpj}
            onChange={handleCnpjChange}
            required
            fullWidth
            className="input-field"
            error={!!cnpjError}
            helperText={cnpjError}
            inputProps={{ maxLength: 18 }}
          />
          <TextField
            label="E-mail"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            fullWidth
            className="input-field"
          />
          <TextField
            label="Telefone"
            value={telefone}
            onChange={handlePhoneNumberChange}
            required
            fullWidth
            className="input-field"
            inputProps={{ maxLength: 14 }}
          />
          <TextField
            label="Endereço"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            required
            fullWidth
            className="input-field"
          />
          <Select
            placeholder="Cidade"
            name="city"
            options={cityOptions}
            className="single-select"
            classNamePrefix="select"
            value={cityOptions.find(option => option.value.id === city?.id)}
            onChange={handleCityChange}
            styles={{ control: (provided) => ({ ...provided, width: '100%', marginTop: '16px', marginBottom: '16px', padding: '8px' }) }}
          />
        </FormLayout>
      </section>
      <ToastContainer />
    </React.Fragment>
  );
}
