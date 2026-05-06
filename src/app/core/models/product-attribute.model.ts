/**
 * Product Attribute Models
 */

export interface AddProductAttributeRequest {
  value: string | string[];
}

export interface UpdateProductAttributeRequest {
  value: string | string[];
}

export interface BulkAddProductAttributesRequest {
  attributes: Array<{
    attributeId: string;
    value: string | string[];
  }>;
}

export interface ProductAttributeResponse {
  id: string;
  attributeId: string;
  attributeName: string;
  attributeCode: string;
  value: string | string[];
}

export interface GetProductAttributesResponse {
  data: ProductAttributeResponse[];
}
