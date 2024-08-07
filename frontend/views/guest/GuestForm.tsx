import React, { useState, useEffect, FormEvent } from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { useNavigate } from 'react-router-dom';
import { createGuest, updateGuest } from 'Frontend/util/GuestService';
import { City } from 'Frontend/models/City';
import { Country } from 'Frontend/models/Country';
import { Guest } from 'Frontend/models/Guest';
import { getGuest } from 'Frontend/util/GuestService';
import TextField from '@mui/material/TextField';
import Select from 'react-select';
import { ErrorWithMessage } from 'Frontend/types/ErrorTypes';
import ActionBar from 'Frontend/components/ActionBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCities } from 'Frontend/util/CityService';
import { getCountries } from 'Frontend/util/CountryService';
import { formatCNPJ, formatPhoneNumber, formatInscricaoEstadual } from 'Frontend/util/masks';
import { Company } from 'Frontend/models/Company';
import { format, parseISO } from 'date-fns';
import { MaritalStatus, MaritalStatusDescriptions } from 'Frontend/models/MaritalStatus';
import { getCompanies } from 'Frontend/util/CompanyService';

interface GuestFormProps {
  onSubmit: () => void;
  selectedGuest?: Guest;
}

export default function GuestForm({ onSubmit, selectedGuest }: GuestFormProps) {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [nationality, setNationality] = useState<Country | null>(null);
  const [email, setEmail] = useState<string>('');
  const [cellPhone, setCellPhone] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [city, setCity] = useState<City | null>(null);
  const [profession, setProfession] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [rg, setRg] = useState<string>('');
  const [birth, setBirth] = useState<Date | null>(null);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | null>(null);
  const [active, setActive] = useState<boolean>(true);
  const [company, setCompany] = useState<Company | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  // const [cnpjError, setCnpjError] = useState<string | null>(null);

  useEffect(() => {
    const loadFormData = async () => {
      const loadedCities = await getCities();
      const loadedCountries = await getCountries();
      const loadedCompanies = await getCompanies();
      setCities(loadedCities);
      setCountries(loadedCountries);
      setCompanies(loadedCompanies);
      
      if (selectedGuest) {
        setName(selectedGuest.name || '');
        setLastname(selectedGuest.lastname || '');
        setEmail(selectedGuest.email || '');
        setCellPhone(selectedGuest.cellPhone || '');
        setTelephone(selectedGuest.telephone || '');
        setAddress(selectedGuest.address || '');
        setCep(selectedGuest.cep || '');
        setProfession(selectedGuest.profession || '');
        setCpf(selectedGuest.cpf || '');
        setRg(selectedGuest.rg || '');

        if (selectedGuest.nationality) {
          const selectedCountry = loadedCountries.find(country => country.id === selectedGuest.nationality?.id);
          setNationality(selectedCountry || null);
        }

        if (selectedGuest.city) {
          const selectedCity = loadedCities.find(city => city.id === selectedGuest.city?.id);
          setCity(selectedCity || null);
        }

        if (selectedGuest.company) {
          const selectedCompany = loadedCompanies.find(company => company.id === selectedGuest.company?.id);
          setCompany(selectedCompany || null);
        }

        if (selectedGuest.maritalStatus) {
          setMaritalStatus(selectedGuest.maritalStatus as MaritalStatus);
        }

        if (selectedGuest.birth) {
          const birthDate = typeof selectedGuest.birth === 'string' ? parseISO(selectedGuest.birth) : selectedGuest.birth;
          setBirth(birthDate);
        }

        setActive(selectedGuest.active || false);
      }
    };
    loadFormData();
  }, [selectedGuest]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newGuest: Omit<Guest, 'id'> = {
      name,
      lastname,
      nationality: nationality as Country,
      email,
      cellPhone,
      telephone,
      address,
      cep,
      city: city as City,
      profession,
      cpf,
      rg,
      birth: birth ? birth.toISOString().split('T')[0] : undefined,
      maritalStatus: maritalStatus as MaritalStatus,
      active
    };

    try {
      if (selectedGuest) {
        await updateGuest({ ...selectedGuest, name, lastname, nationality: nationality as Country, email, cellPhone, telephone, address, cep, city: city as City, profession, cpf, rg, birth: birth ? birth.toISOString().split('T')[0] : undefined, maritalStatus: maritalStatus as MaritalStatus, active });
      } else {
        await createGuest(newGuest);
      }
      onSubmit();
      navigate('/guest');
      toast.success('Informações salvas', { theme: 'colored' });
    } catch (error) {
      const e = error as ErrorWithMessage;
      if (e.message === 'Duplicate entry for cpf value.') {
        toast.error('Erro: CPF Já cadastrado.', { theme: 'colored' });
      } else {
        toast.error('Erro ao salvar hóspede.', { theme: 'colored' });
      }
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
    navigate('/guest');
  };

  const handleCityChange = (selectedOption: any) => {
    setCity(selectedOption ? selectedOption.value : null);
  };

  const handleNationalityChange = (selectedOption: any) => {
    setNationality(selectedOption.value);
  };

  const handleCompanyChange = (selectedOption: any) => {
    setCompany(selectedOption.value)
  };

  const cityOptions = cities.map(city => ({
    value: city,
    label: city.name
  }));

  const countryOptions = countries.map(country => ({
    value: country,
    label: country.nationality
  }));

  const companyOptions = companies.map(company => ({
    value: company,
    label: company.razaoSocial
  }));

  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '500px', columns: 2 },
  ];

  const maritalStatusOptions = Object.values(MaritalStatus).map(status => ({
    value: status,
    label: MaritalStatusDescriptions[status]
  }));

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
          label="Sobrenome"
          value={lastname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastname(e.target.value)}
          required
          fullWidth
          className="input-field"
        />
        <Select
          placeholder="Nacionalidade"
          name="nationality"
          options={countryOptions}
          className="single-select"
          classNamePrefix="select"
          value={countryOptions.find(option => option.value.id === nationality?.id)}
          onChange={handleNationalityChange}
          styles={{ control: (provided) => ({ ...provided, width: '100%', marginTop: '16px', marginBottom: '16px', padding: '8px' }) }}
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
          label="Celular"
          value={cellPhone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCellPhone(e.target.value)}
          required
          fullWidth
          className="input-field"
        />
        <TextField
          label="Telefone"
          value={telephone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelephone(e.target.value)}
          fullWidth
          className="input-field"
        />
        <TextField
          label="Endereço"
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          required
          fullWidth
          className="input-field"
        />
        <TextField
          label="Cep"
          value={cep}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCep(e.target.value)}
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
        <TextField
          label="Data de Nascimento"
          type="date"
          value={birth ? format(birth, 'yyyy-MM-dd') : ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirth(e.target.value ? parseISO(e.target.value) : null)}
          fullWidth
          className="input-field"
        />
        <TextField
          label="Profissão"
          value={profession}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfession(e.target.value)}
          required
          fullWidth
          className="input-field"
        />
        <TextField
          label="CPF"
          value={cpf}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpf(e.target.value)}
          required
          fullWidth
          className="input-field"
        />
        <TextField
          label="RG"
          value={rg}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRg(e.target.value)}
          fullWidth
          className="input-field"
        />
        <Select
          placeholder="Estado Civil"
          name="maritalStatus"
          options={maritalStatusOptions}
          className="single-select"
          classNamePrefix="select"
          value={maritalStatus ? maritalStatusOptions.find(option => option.value === maritalStatus) : null}
          onChange={(selectedOption) => setMaritalStatus(selectedOption?.value || null)}
          styles={{ control: (provided) => ({ ...provided, width: '100%', marginTop: '16px', marginBottom: '16px', padding: '8px' }) }}
        />
        <Select
          placeholder="Situação"
          name="active"
          options={[
            { value: true, label: "Ativo" },
            { value: false, label: "Inativo" }
          ]}
          className="single-select"
          classNamePrefix="select"
          value={{ value: active, label: active ? "Ativo" : "Inativo" }}
          onChange={(selectedOption) => setActive(selectedOption?.value || false)}
          styles={{ control: (provided) => ({ ...provided, width: '100%', marginTop: '16px', marginBottom: '16px', padding: '8px' }) }}
        />
        <Select
          placeholder="Empresa"
          name="company"
          options={companyOptions}
          className="single-select"
          classNamePrefix="select"
          value={companyOptions.find(option => option.value.id === company?.id)}
          onChange={handleCompanyChange}
          styles={{ control: (provided) => ({ ...provided, width: '100%', marginTop: '16px', marginBottom: '16px', padding: '8px' }) }}
        />
      </FormLayout>
      </section>
      <ToastContainer />
    </React.Fragment>
  );
}
