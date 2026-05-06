import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateProductRequest,
  UpdateProductRequest,
  BulkCreateProductsRequest,
  ProductDetailedResponse,
  GetAllProductsResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = environment.catalogBaseUrl;

  // Create product (Vendor)
  createProduct(request: CreateProductRequest): Observable<ProductDetailedResponse> {
    return this.http.post<ProductDetailedResponse>(
      `${this.baseUrl}/catalog/api/v1/products/`,
      request
    );
  }

  // Bulk create products (Vendor)
  bulkCreateProducts(
    request: BulkCreateProductsRequest
  ): Observable<ProductDetailedResponse[]> {
    return this.http.post<ProductDetailedResponse[]>(
      `${this.baseUrl}/catalog/api/v1/products/bulk`,
      request
    );
  }

  // Update product details (Vendor)
  updateProduct(
    id: string,
    request: UpdateProductRequest
  ): Observable<ProductDetailedResponse> {
    return this.http.put<ProductDetailedResponse>(
      `${this.baseUrl}/catalog/api/v1/products/${id}`,
      request
    );
  }

  // Activate product (Vendor)
  activateProduct(id: string): Observable<ProductDetailedResponse> {
    return this.http.patch<ProductDetailedResponse>(
      `${this.baseUrl}/catalog/api/v1/products/${id}/active`,
      {}
    );
  }

  // Archive product (Vendor)
  archiveProduct(id: string): Observable<ProductDetailedResponse> {
    return this.http.patch<ProductDetailedResponse>(
      `${this.baseUrl}/catalog/api/v1/products/${id}/archive`,
      {}
    );
  }

  // Get product by ID
  getProductById(id: string): Observable<ProductDetailedResponse> {
    return this.http.get<ProductDetailedResponse>(
      `${this.baseUrl}/catalog/api/v1/products/${id}`
    );
  }

  // Get all products
  getAllProducts(): Observable<GetAllProductsResponse> {
    return this.http.get<GetAllProductsResponse>(
      `${this.baseUrl}/catalog/api/v1/products/`
    );
  }
}
