import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AddProductCategoryRequest,
  UpdateProductCategoryRequest,
  ProductCategoryResponse,
  GetProductCategoriesResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private http = inject(HttpClient);
  private baseUrl = environment.catalogBaseUrl;

  // Add category to product
  addProductCategory(
    productId: string,
    categoryId: string,
    request: AddProductCategoryRequest
  ): Observable<ProductCategoryResponse> {
    return this.http.post<ProductCategoryResponse>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/categories/${categoryId}`,
      request
    );
  }

  // Update product category
  updateProductCategory(
    productId: string,
    categoryId: string,
    isPrimary: boolean
  ): Observable<ProductCategoryResponse> {
    const params = { isPrimary: isPrimary.toString() };
    return this.http.patch<ProductCategoryResponse>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/categories/${categoryId}`,
      {},
      { params }
    );
  }

  // Remove category from product
  removeProductCategory(productId: string, categoryId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/categories/${categoryId}`
    );
  }

  // Activate product category
  activateProductCategory(productId: string, categoryId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/categories/${categoryId}/active`,
      {}
    );
  }

  // Get specific product category
  getProductCategory(
    productId: string,
    categoryId: string
  ): Observable<ProductCategoryResponse> {
    return this.http.get<ProductCategoryResponse>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/categories/${categoryId}`
    );
  }

  // Get all product categories
  getProductCategories(productId: string): Observable<GetProductCategoriesResponse> {
    return this.http.get<GetProductCategoriesResponse>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/categories`
    );
  }
}
