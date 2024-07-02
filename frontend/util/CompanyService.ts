import { CompanyEndpoint } from 'Frontend/generated/endpoints';
import { Company } from 'Frontend/models/Company';
import Pageable from 'Frontend/generated/dev/hilla/mappedtypes/Pageable';
import { ErrorWithMessage } from 'Frontend/types/ErrorTypes';

export async function getCompanies(): Promise<Company[]> {
  const pageable: Pageable = {
    pageNumber: 0,
    pageSize: 1000,
    sort: {
      orders: []
    }
  };

  const response = await CompanyEndpoint.listCompanies(pageable);

  if (!Array.isArray(response)) {
    throw new Error('Invalid response structure');
  }

  return response.map((company: any) => ({
    ...company,
  }));
}

export async function getCompaniesByName(name: string): Promise<Company[]> {
  const response = await CompanyEndpoint.listCompanyByName(name);

  if (!Array.isArray(response)) {
    throw new Error('Invalid response structure');
  }

  return response.map((company: any) => ({
    ...company,
  }));
}

export async function createCompany(company: Omit<Company, 'id'>): Promise<Company> {
  try {
    const savedCompany = await CompanyEndpoint.save(company as any);
    if (!savedCompany) {
      throw new Error('Failed to create company');
    }
    return savedCompany;
  } catch (error: unknown) {
    const e = error as ErrorWithMessage;
    if (e.message.includes('Duplicate entry')) {
      throw new Error('Duplicate entry for razao social.');
    }
    throw new Error('Error creating company.');
  }
}

export async function updateCompany(company: Company): Promise<Company> {
  try {
    const result = await CompanyEndpoint.save(company as any);
    if (!result) {
      throw new Error('Failed to update company');
    }
    return result;
  } catch (error: unknown) {
    const e = error as ErrorWithMessage;
    if (e.message.includes('Duplicate entry')) {
      throw new Error('Duplicate entry for company.');
    }
    throw new Error('Error updating company.');
  }
}

export async function getCompany(id: number): Promise<Company> {
  const response: Company | undefined = await CompanyEndpoint.load(id);

  if (!response) {
    throw new Error('Failed to fetch company');
  }

  return response;
}

export async function deleteCompanies(companyIds: number[]): Promise<void> {
  await CompanyEndpoint.deleteCompanies(companyIds);
}
