import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AddProductAttributeRequest,
  UpdateProductAttributeRequest,
  BulkAddProductAttributesRequest,
  GetProductAttributesResponse,
  ProductAttributeResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductAttributeService {
  private http = inject(HttpClient);
  private baseUrl = environment.catalogBaseUrl;

  // Add product attribute
  addProductAttribute(
    productId: string,
    attributeId: string,
    request: AddProductAttributeRequest
  ): Observable<ProductAttributeResponse> {
    return this.http.post<ProductAttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/attributes/${attributeId}`,
      request
    );
  }

  // Bulk add product attributes
  bulkAddProductAttributes(
    productId: string,
    request: BulkAddProductAttributesRequest
  ): Observable<ProductAttributeResponse[]> {
    return this.http.post<ProductAttributeResponse[]>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/attributes/bulk`,
      request
    );
  }

  // Update product attribute
  updateProductAttribute(
    productId: string,
    attributeId: string,
    request: UpdateProductAttributeRequest
  ): Observable<ProductAttributeResponse> {
    return this.http.put<ProductAttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/attributes/${attributeId}`,
      request
    );
  }

  // Delete product attribute
  deleteProductAttribute(productId: string, attributeId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/attributes/${attributeId}`
    );
  }

  // Delete all values for attribute
  deleteAllProductAttributeValues(
    productId: string,
    attributeId: string
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/attributes/${attributeId}/all`
    );
  }

  // Get all product attributes
  getProductAttributes(productId: string): Observable<GetProductAttributesResponse> {
    return this.http.get<GetProductAttributesResponse>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/attributes/`
    );
  }

  // Get specific product attribute
  getProductAttribute(
    productId: string,
    attributeId: string
  ): Observable<ProductAttributeResponse> {
    return this.http.get<ProductAttributeResponse>(
      `${this.baseUrl}/catalog/api/v1/products/${productId}/attributes/${attributeId}`
    );
  }
}
