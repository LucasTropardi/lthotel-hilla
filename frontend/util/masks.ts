export const formatCNPJ = (value: string): string => {
  const cnpj = value.replace(/\D/g, ''); // Remove caracteres não numéricos

  // Aplica a máscara
  return cnpj.replace(/^(\d{2})(\d)/, '$1.$2')
             .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
             .replace(/\.(\d{3})(\d)/, '.$1/$2')
             .replace(/(\d{4})(\d)/, '$1-$2');
};

export const formatCPF = (value: string): string => {
  const cpf = value.replace(/\D/g, '');

  return cpf.replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2');
};

export const formatPhoneNumber = (value: string): string => {
  const phone = value.replace(/\D/g, ''); 

  if (phone.length > 10) {
    return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else {
    return phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
};

export const formatInscricaoEstadual = (value: string): string => {
  return value.replace(/\D/g, ''); 
};
