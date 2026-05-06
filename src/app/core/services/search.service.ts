import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ProductSearchRequest,
  ProductSearchResponse,
  SuggestionsResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);
  private baseUrl = environment.catalogBaseUrl;

  searchProducts(request: ProductSearchRequest): Observable<ProductSearchResponse> {
    return this.http.post<ProductSearchResponse>(
      `${this.baseUrl}/catalog/api/v1/products/search/products`,
      request
    );
  }

  getSuggestions(prefix: string, size: number = 10): Observable<SuggestionsResponse> {
    const params = new HttpParams()
      .set('prefix', prefix)
      .set('size', size.toString());

    return this.http.get<SuggestionsResponse>(
      `${this.baseUrl}/catalog/api/v1/products/search/products/suggest`,
      { params }
    );
  }
}
