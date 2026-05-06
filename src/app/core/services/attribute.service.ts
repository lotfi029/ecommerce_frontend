import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateAttributeRequest,
  UpdateAttributeDetailsRequest,
  UpdateAttributeOptionsRequest,
  AttributeResponse,
  GetAllAttributesResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class AttributeService {
  private http = inject(HttpClient);
  private baseUrl = environment.catalogBaseUrl;

  // Create attribute (Admin)
  createAttribute(request: CreateAttributeRequest): Observable<AttributeResponse> {
    return this.http.post<AttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/attributes/`,
      request
    );
  }

  // Update attribute details (Admin)
  updateAttributeDetails(
    id: string,
    request: UpdateAttributeDetailsRequest
  ): Observable<AttributeResponse> {
    return this.http.put<AttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/attributes/${id}/details`,
      request
    );
  }

  // Update attribute options (Admin)
  updateAttributeOptions(
    id: string,
    request: UpdateAttributeOptionsRequest
  ): Observable<AttributeResponse> {
    return this.http.put<AttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/attributes/${id}/options`,
      request
    );
  }

  // Delete attribute (Admin)
  deleteAttribute(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/catalog/api/v1/attributes/${id}`
    );
  }

  // Activate attribute (Admin)
  activateAttribute(id: string): Observable<AttributeResponse> {
    return this.http.patch<AttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/attributes/${id}/activate`,
      {}
    );
  }

  // Deactivate attribute (Admin)
  deactivateAttribute(id: string): Observable<AttributeResponse> {
    return this.http.patch<AttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/attributes/${id}/deactivate`,
      {}
    );
  }

  // Get all attributes
  getAllAttributes(): Observable<GetAllAttributesResponse> {
    return this.http.get<GetAllAttributesResponse>(
      `${this.baseUrl}/catalog/api/v1/attributes`
    );
  }

  // Get attribute by ID
  getAttributeById(id: string): Observable<AttributeResponse> {
    return this.http.get<AttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/attributes/${id}/`
    );
  }

  // Get attribute by code
  getAttributeByCode(code: string): Observable<AttributeResponse> {
    return this.http.get<AttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/attributes/code/${code}`
    );
  }

  // Get attributes by type
  getAttributesByType(type: string): Observable<GetAllAttributesResponse> {
    return this.http.get<GetAllAttributesResponse>(
      `${this.baseUrl}/catalog/api/v1/attributes/type/${type}`
    );
  }
}
