/**
 * Product Category Models
 */

export interface AddProductCategoryRequest {
  categoryId: string;
  isPrimary: boolean;
}

export interface UpdateProductCategoryRequest {
  isPrimary: boolean;
}

export interface ProductCategoryResponse {
  id: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  isPrimary: boolean;
  isActive: boolean;
}

export interface GetProductCategoriesResponse {
  data: ProductCategoryResponse[];
}
