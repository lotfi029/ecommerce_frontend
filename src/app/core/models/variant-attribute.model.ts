/**
 * Variant Attribute Models
 */

export interface CreateVariantAttributeRequest {
  name: string;
  code: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}

export interface UpdateVariantAttributeRequest {
  name: string;
  code: string;
  options: Array<{
    id?: string;
    label: string;
    value: string;
  }>;
}

export interface VariantAttributeResponse {
  id: string;
  name: string;
  code: string;
  options: Array<{
    id: string;
    label: string;
    value: string;
  }>;
  createdAt: string;
  updatedAt?: string;
}

export interface GetAllVariantAttributesResponse {
  data: VariantAttributeResponse[];
}

export interface BulkCreateVariantAttributesRequest {
  attributes: CreateVariantAttributeRequest[];
}
