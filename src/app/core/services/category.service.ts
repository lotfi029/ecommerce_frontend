import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CategoryDetailedResponse,
  CategoryResponse,
  CategoryRequest,
  UpdateCategoryDetailsRequest,
  MoveCategoryRequest,
  DeleteCategoryRequest,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = environment.catalogBaseUrl;

  // Create category (Admin)
  createCategory(request: CategoryRequest): Observable<CategoryDetailedResponse> {
    return this.http.post<CategoryDetailedResponse>(
      `${this.baseUrl}/catalog/api/v1/categories/`,
      request
    );
  }

  // Update category details (Admin)
  updateCategoryDetails(
    id: string,
    request: UpdateCategoryDetailsRequest
  ): Observable<CategoryDetailedResponse> {
    return this.http.post<CategoryDetailedResponse>(
      `${this.baseUrl}/catalog/api/v1/categories/${id}/update-details`,
      request
    );
  }

  // Move category to new parent (Admin)
  moveCategory(id: string, newParent: string): Observable<CategoryDetailedResponse> {
    return this.http.put<CategoryDetailedResponse>(
      `${this.baseUrl}/catalog/api/v1/categories/${id}/move`,
      {},
      { params: { newParent } }
    );
  }

  // Delete category (Admin)
  deleteCategory(id: string, moveProductTo?: string): Observable<void> {
    const params: any = {};
    if (moveProductTo) {
      params.moveProductTo = moveProductTo;
    }
    return this.http.delete<void>(
      `${this.baseUrl}/catalog/api/v1/categories/${id}`,
      { params }
    );
  }

  // Get category by ID
  getCategoryById(id: string): Observable<CategoryDetailedResponse> {
    return this.http.get<CategoryDetailedResponse>(
      `${this.baseUrl}/catalog/api/v1/categories/${id}`
    );
  }

  // Get category by slug
  getCategoryBySlug(slug: string): Observable<CategoryDetailedResponse> {
    return this.http.get<CategoryDetailedResponse>(
      `${this.baseUrl}/catalog/api/v1/categories/slug/${slug}`
    );
  }

  // Get category tree
  getCategoryTree(parentId?: string): Observable<CategoryResponse[]> {
    const params: any = {};
    if (parentId) {
      params.parentId = parentId;
    }
    return this.http.get<CategoryResponse[]>(
      `${this.baseUrl}/catalog/api/v1/categories/tree`,
      { params }
    );
  }
}
