import City from "./City";

export interface Company {
  id?: number;
  razaoSocial?: string;
  inscricaoEstadual?: string;
  fantasia?: string;
  cnpj?: string;
  address?: string;
  city?: City;
  email?: string;
  telefone?: string;
}

export const validateCNPJ = (cnpj: string): boolean => {
  if (!cnpj) return false;
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) return false;

  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1*$/.test(cnpj)) return false;

  // Validação dos dígitos verificadores
  const validateDigits = (cnpj: string, weight: number[]): boolean => {
    const digits = cnpj.split('').map(Number);
    const sum = digits.slice(0, weight.length).reduce((acc, digit, index) => acc + digit * weight[index], 0);
    const remainder = sum % 11;
    const digit = remainder < 2 ? 0 : 11 - remainder;
    return digit === digits[weight.length];
  };

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  return validateDigits(cnpj, weights1) && validateDigits(cnpj, weights2);
};
