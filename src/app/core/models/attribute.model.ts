/**
 * Attribute Models
 */

export type AttributeOptionType = 'Text' | 'Color' | 'Size' | 'MultiSelect' | 'SingleSelect';

export interface AttributeOption {
  id?: string;
  label: string;
  value: string;
}

export interface CreateAttributeRequest {
  name: string;
  code: string;
  optionsType: AttributeOptionType;
  isFilterable: boolean;
  isSearchable: boolean;
  options: AttributeOption[];
}

export interface UpdateAttributeDetailsRequest {
  name: string;
  code: string;
  optionsType: AttributeOptionType;
  isFilterable: boolean;
  isSearchable: boolean;
}

export interface UpdateAttributeOptionsRequest {
  options: AttributeOption[];
}

export interface AttributeResponse {
  id: string;
  name: string;
  code: string;
  optionsType: AttributeOptionType;
  isFilterable: boolean;
  isSearchable: boolean;
  isActive: boolean;
  options: AttributeOption[];
  createdAt: string;
  updatedAt?: string;
}

export interface GetAllAttributesResponse {
  data: AttributeResponse[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}
