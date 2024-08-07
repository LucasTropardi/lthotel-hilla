export enum MaritalStatus {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
  SEPARATED = "SEPARATED",
  ENGAGED = "ENGAGED",
  RELATIONSHIP = "RELATIONSHIP",
  CIVILUNION = "CIVILUNION"
}

export const MaritalStatusDescriptions: { [key in MaritalStatus]: string } = {
  [MaritalStatus.SINGLE]: 'Solteiro',
  [MaritalStatus.MARRIED]: 'Casado',
  [MaritalStatus.DIVORCED]: 'Divorciado',
  [MaritalStatus.WIDOWED]: 'Viúvo',
  [MaritalStatus.SEPARATED]: 'Separado',
  [MaritalStatus.ENGAGED]: 'Noivo',
  [MaritalStatus.RELATIONSHIP]: 'Em um relacionamento',
  [MaritalStatus.CIVILUNION]: 'União civil',
};