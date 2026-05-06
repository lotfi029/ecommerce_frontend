import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateProductVariantRequest,
  UpdateProductVariantPriceRequest,
  ProductVariantResponse,
  GetProductVariantsResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductVariantService {
  private http = inject(HttpClient);
  private baseUrl = environment.catalogBaseUrl;

  // Add product variant (Vendor)
  createProductVariant(
    request: CreateProductVariantRequest
  ): Observable<ProductVariantResponse> {
    return this.http.put<ProductVariantResponse>(
      `${this.baseUrl}/catalog/api/v1/product-variants/`,
      request
    );
  }

  // Update product variant price (Vendor)
  updateProductVariantPrice(
    variantId: string,
    request: UpdateProductVariantPriceRequest
  ): Observable<ProductVariantResponse> {
    return this.http.put<ProductVariantResponse>(
      `${this.baseUrl}/catalog/api/v1/product-variants/${variantId}/price`,
      request
    );
  }

  // Delete product variant (Vendor)
  deleteProductVariant(variantId: string, productId: string): Observable<void> {
    const params = new HttpParams().set('productId', productId);
    return this.http.delete<void>(
      `${this.baseUrl}/catalog/api/v1/product-variants/${variantId}`,
      { params }
    );
  }

  // Get product variant by ID
  getProductVariantById(variantId: string): Observable<ProductVariantResponse> {
    return this.http.get<ProductVariantResponse>(
      `${this.baseUrl}/catalog/api/v1/product-variants/${variantId}`
    );
  }

  // Get all variants for product
  getProductVariantsByProductId(productId: string): Observable<GetProductVariantsResponse> {
    return this.http.get<GetProductVariantsResponse>(
      `${this.baseUrl}/catalog/api/v1/product-variants/by-product/${productId}`
    );
  }

  // Get product variant by SKU
  getProductVariantBySku(sku: string): Observable<ProductVariantResponse> {
    const params = new HttpParams().set('sku', sku);
    return this.http.get<ProductVariantResponse>(
      `${this.baseUrl}/catalog/api/v1/product-variants/sku`,
      { params }
    );
  }
}
