/**
 * Product Models
 */

export interface CreateProductRequest {
  name: string;
  description?: string;
}

export interface UpdateProductRequest {
  name: string;
  description?: string;
}

export interface BulkCreateProductsRequest {
  products: CreateProductRequest[];
}

export interface ProductDetailedResponse {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  isArchived: boolean;
  vendorId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  isArchived: boolean;
  vendorId: string;
}

export interface GetAllProductsResponse {
  data: ProductDetailedResponse[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface ProductSearchRequest {
  searchTerm?: string;
  categoryIds?: string[];
  filters?: Record<string, any>;
  minPrice?: number;
  maxPrice?: number;
  page: number;
  size: number;
}

export interface ProductSearchResponse {
  data: ProductDetailedResponse[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface SuggestionsRequest {
  prefix: string;
  size?: number;
}

export interface SuggestionsResponse {
  suggestions: string[];
}
