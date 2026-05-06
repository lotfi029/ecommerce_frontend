/**
 * Category Models
 */

export interface CategoryRequest {
  name: string;
  slug: string;
  isActive: boolean;
  parentId?: string;
  description?: string;
}

export interface UpdateCategoryDetailsRequest {
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

export interface MoveCategoryRequest {
  newParent: string;
}

export interface CategoryDetailedResponse {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  description?: string;
  parentId?: string;
  children: CategoryDetailedResponse[];
}

export interface CategoryResponse {
  id: string;
  name: string;
  slug: string;
  children: CategoryResponse[];
}

export interface CategoryTreeResponse {
  data: CategoryResponse[];
}

export interface DeleteCategoryRequest {
  moveProductTo?: string;
}
