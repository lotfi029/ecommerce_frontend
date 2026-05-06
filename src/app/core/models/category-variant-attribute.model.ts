/**
 * Category Variant Attribute Models
 */

export interface AddCategoryVariantAttributeRequest {
  variantAttributeId: string;
}

export interface BulkAddCategoryVariantAttributesRequest {
  variantAttributeIds: string[];
}

export interface UpdateCategoryVariantAttributeRequest {
  variantAttributeId: string;
}

export interface CategoryVariantAttributeResponse {
  id: string;
  categoryId: string;
  variantAttributeId: string;
  variantAttributeName: string;
  variantAttributeCode: string;
}

export interface GetCategoryVariantAttributesResponse {
  data: CategoryVariantAttributeResponse[];
}
