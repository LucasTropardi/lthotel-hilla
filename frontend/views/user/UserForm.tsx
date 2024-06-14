import React, { useState, useEffect } from 'react';
import { Button } from '@hilla/react-components/Button.js';
import { FormLayout } from '@hilla/react-components/FormLayout.js';
import { Icon } from '@hilla/react-components/Icon.js';
import { PasswordField } from '@hilla/react-components/PasswordField.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { Tooltip } from '@hilla/react-components/Tooltip.js';
import { useNavigate } from 'react-router-dom';
import { createUser, updateUser } from 'Frontend/util/UserService';
import { User } from 'Frontend/models/User';
import { Role } from 'Frontend/models/Role';
import Select from 'react-select';
import { Notification } from '@hilla/react-components/Notification.js';

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
      Notification.show('As senhas não coincidem', {
        theme: "error",
        position: 'top-center',
        duration: 2500,
      });
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

    if (selectedUser) {
      if (!password) {
        delete newUser.hashedPassword;
      }
      await updateUser(selectedUser.id, newUser);
    } else {
      if (!password) {
        Notification.show('Informe a senha', {
          position: 'top-center',
          theme: 'warning',
          duration: 2600,
        });
        return;
      }
      await createUser(newUser);
    }
    onSubmit();
    navigate('/user');
    Notification.show('Informações salvas', {
      theme: "success",
      position: 'top-end',
      duration: 2000,
    });
  };

  const handleCancel = () => {
    onSubmit();
    navigate('/user');
  };

  const handleRoleChange = (selectedOptions: any) => {
    const selectedRoles = selectedOptions.map((option: any) => option.value as Role);
    setRoles(selectedRoles);
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
        <FormLayout responsiveSteps={responsiveSteps}>
          <TextField {...{ colspan: 2 }} label="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
          <Select
            placeholder="Roles"
            isMulti
            name="roles"
            options={roleItems}
            className="multi-select"
            classNamePrefix="select"
            value={roles.map(role => ({ value: role, label: role }))}
            onChange={handleRoleChange}
          />
          <PasswordField label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required={!selectedUser} />
          <PasswordField label="Confirme a senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required={!selectedUser} />
        </FormLayout>
      </section>
    </React.Fragment>
  );
}
