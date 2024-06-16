import React, { useState, useEffect } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { useNavigate } from 'react-router-dom';
import { createUser, updateUser } from 'Frontend/util/UserService';
import { User } from 'Frontend/models/User';
import { Role } from 'Frontend/models/Role';
import Select from 'react-select';
import { Notification } from '@hilla/react-components/Notification.js';
import TextField from '@mui/material/TextField';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorWithMessage } from 'Frontend/types/ErrorTypes';

interface UserFormProps {
  onSubmit: () => void;
  selectedUser?: User;
}

export default function UserForm({ onSubmit, selectedUser }: UserFormProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [roles, setRoles] = useState<Role[]>([]);
  const [profilePicture, setProfilePicture] = useState<number[]>([]);
  const roleItems = Object.values(Role).map(role => ({ value: role, label: role }));

  useEffect(() => {
    if (selectedUser) {
      setUsername(selectedUser.username);
      setName(selectedUser.name);
      setRoles(selectedUser.roles);
      setProfilePicture(selectedUser.profilePicture || []);
    }
  }, [selectedUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem', { theme: 'colored' });
      return;
    }

    const newUser: User = {
      id: selectedUser ? selectedUser.id : 0,
      version: selectedUser ? selectedUser.version : 0,
      username,
      name,
      hashedPassword: password ? password : undefined,
      roles,
      profilePicture
    };

    try {
      if (selectedUser) {
        if (!password) {
          delete newUser.hashedPassword;
        }
        await updateUser(selectedUser.id, newUser);
      } else {
        if (!password) {
          toast.warning('Informe a senha', { theme: 'colored' });
          return;
        }
        await createUser(newUser);
      }
      onSubmit();
      navigate('/user');
      toast.success('Informações salvas', { theme: 'colored' });
    } catch (error) {
      const e = error as ErrorWithMessage;
      if (e.message === 'Duplicate entry for username.') {
        toast.error('Erro: Nome de usuário duplicado.', { theme: 'colored' });
      } else {
        toast.error('Erro ao salvar usuário.', { theme: 'colored' });
      }
    }
  };

  const handleCancel = () => {
    onSubmit();
    navigate('/user');
  };

  const handleRoleChange = (selectedOptions: any) => {
    const selectedRoles = selectedOptions.map((option: any) => option.value as Role);
    setRoles(selectedRoles);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: '100%',
      marginTop: '16px',
      marginBottom: '16px',
      padding: '8px',
    }),
  };

  const responsiveSteps = [
    { minWidth: '0', columns: 1 },
    { minWidth: '500px', columns: 2 },
  ];

  return (
    <React.Fragment>
      <section className="actions">
        <Button theme="icon" aria-label="Save" className='button' onClick={handleSubmit} >
          <Tooltip slot="tooltip" text="Salvar" />
          <Icon className='fa-solid fa-check' />
        </Button>
        <Button theme="icon" aria-label="Cancel" className='button' onClick={handleCancel}>
          <Tooltip slot="tooltip" text="Cancelar" />
          <Icon className='fa-solid fa-xmark' />
        </Button>
      </section>
      <section className="form-container">
        <FormLayout responsiveSteps={responsiveSteps} className='form-layout'>
          
          <TextField
            label="Usuário"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            required
            fullWidth
            className="usuario-field"
          />
          <TextField
            label="Nome"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
            fullWidth
            className="input-field"
          />
          
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required={!selectedUser}
            fullWidth
            className="input-field"
          />
          <TextField
            label="Confirme a senha"
            type="password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            required={!selectedUser}
            fullWidth
            className="input-field"
          />
          <Select
            {...{ colspan: 2 }}
            placeholder="Roles"
            isMulti
            name="roles"
            options={roleItems}
            className="multi-select"
            classNamePrefix="select"
            value={roles.map(role => ({ value: role, label: role }))}
            onChange={handleRoleChange}
            styles={customStyles}
          />
        </FormLayout>
      </section>
      <ToastContainer />
    </React.Fragment>
  );
}
