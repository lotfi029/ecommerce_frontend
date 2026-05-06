import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateVariantAttributeRequest,
  UpdateVariantAttributeRequest,
  BulkCreateVariantAttributesRequest,
  VariantAttributeResponse,
  GetAllVariantAttributesResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class VariantAttributeService {
  private http = inject(HttpClient);
  private baseUrl = environment.catalogBaseUrl;

  // Create variant attribute (Admin)
  createVariantAttribute(
    request: CreateVariantAttributeRequest
  ): Observable<VariantAttributeResponse> {
    return this.http.post<VariantAttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/variant-attributes`,
      request
    );
  }

  // Bulk create variant attributes (Admin)
  bulkCreateVariantAttributes(
    request: BulkCreateVariantAttributesRequest
  ): Observable<VariantAttributeResponse[]> {
    return this.http.post<VariantAttributeResponse[]>(
      `${this.baseUrl}/catalog/api/v1/variant-attributes/bulk`,
      request
    );
  }

  // Update variant attribute (Admin)
  updateVariantAttribute(
    id: string,
    request: UpdateVariantAttributeRequest
  ): Observable<VariantAttributeResponse> {
    return this.http.put<VariantAttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/variant-attributes/${id}`,
      request
    );
  }

  // Delete variant attribute (Admin)
  deleteVariantAttribute(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/catalog/api/v1/variant-attributes/${id}`
    );
  }

  // Get variant attribute by ID
  getVariantAttributeById(id: string): Observable<VariantAttributeResponse> {
    return this.http.get<VariantAttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/variant-attributes/${id}`
    );
  }

  // Get all variant attributes
  getAllVariantAttributes(): Observable<GetAllVariantAttributesResponse> {
    return this.http.get<GetAllVariantAttributesResponse>(
      `${this.baseUrl}/catalog/api/v1/variant-attributes`
    );
  }
}
