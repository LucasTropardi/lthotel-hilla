import { City } from "./City";
import { Company } from "./Company";
import { Country } from "./Country";

export interface Guest {
  id?: number;
  name?: string;
  lastname?: string;
  nationality?: Country;
  email?: string;
  cellPhone?: string;
  telephone?: string;
  address?: string;
  cep?: string;
  city?: City;
  profession?: string;
  cpf?: string;
  rg?: string;
  birth?: string;
  maritalStatus?: string;
  active?: boolean;
  company?: Company;
}
