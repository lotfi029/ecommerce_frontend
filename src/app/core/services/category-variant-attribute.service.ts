import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AddCategoryVariantAttributeRequest,
  BulkAddCategoryVariantAttributesRequest,
  UpdateCategoryVariantAttributeRequest,
  CategoryVariantAttributeResponse,
  GetCategoryVariantAttributesResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoryVariantAttributeService {
  private http = inject(HttpClient);
  private baseUrl = environment.catalogBaseUrl;

  // Add variant attribute to category (Admin)
  addCategoryVariantAttribute(
    categoryId: string,
    request: AddCategoryVariantAttributeRequest
  ): Observable<CategoryVariantAttributeResponse> {
    return this.http.post<CategoryVariantAttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/categories/${categoryId}/variant-attributes/`,
      request
    );
  }

  // Bulk add variant attributes to category (Admin)
  bulkAddCategoryVariantAttributes(
    categoryId: string,
    request: BulkAddCategoryVariantAttributesRequest
  ): Observable<CategoryVariantAttributeResponse[]> {
    return this.http.post<CategoryVariantAttributeResponse[]>(
      `${this.baseUrl}/catalog/api/v1/categories/${categoryId}/variant-attributes/bulk`,
      request
    );
  }

  // Update category variant attribute (Admin)
  updateCategoryVariantAttribute(
    categoryId: string,
    variantAttributeId: string,
    request: UpdateCategoryVariantAttributeRequest
  ): Observable<CategoryVariantAttributeResponse> {
    return this.http.put<CategoryVariantAttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/categories/${categoryId}/variant-attributes/${variantAttributeId}`,
      request
    );
  }

  // Remove variant attribute from category (Admin)
  removeCategoryVariantAttribute(
    categoryId: string,
    variantAttributeId: string
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/catalog/api/v1/categories/${categoryId}/variant-attributes/${variantAttributeId}`
    );
  }

  // Get specific category variant attribute
  getCategoryVariantAttribute(
    categoryId: string,
    variantAttributeId: string
  ): Observable<CategoryVariantAttributeResponse> {
    return this.http.get<CategoryVariantAttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/categories/${categoryId}/variant-attributes/${variantAttributeId}`
    );
  }

  // Get all category variant attributes
  getCategoryVariantAttributes(
    categoryId: string
  ): Observable<GetCategoryVariantAttributesResponse> {
    return this.http.get<GetCategoryVariantAttributesResponse>(
      `${this.baseUrl}/catalog/api/v1/categories/${categoryId}/variant-attributes/`
    );
  }
}
