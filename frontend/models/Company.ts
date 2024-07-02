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
