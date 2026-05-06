/**
 * Product Variant Models
 */

export interface VariantValue {
  variantId: string;
  value: string;
}

export interface CreateProductVariantRequest {
  productId: string;
  price: number;
  compareAtPrice?: number;
  variants: VariantValue[];
}

export interface UpdateProductVariantPriceRequest {
  price: number;
  compareAtPrice?: number;
  currency?: string;
}

export interface ProductVariantResponse {
  id: string;
  productId: string;
  sku?: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  variants: Array<{
    variantAttributeId: string;
    variantAttributeName: string;
    value: string;
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface GetProductVariantsResponse {
  data: ProductVariantResponse[];
}

export interface GetProductVariantBySkuRequest {
  sku: string;
}
