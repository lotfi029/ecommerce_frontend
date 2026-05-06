import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReindexService {
  private http = inject(HttpClient);
  private baseUrl = environment.catalogBaseUrl;

  // Reindex products (Admin)
  reindexProducts(): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.baseUrl}/catalog/api/v1/re-index/products`,
      {}
    );
  }

  // Reindex attributes (Admin)
  reindexAttributes(): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.baseUrl}/catalog/api/v1/re-index/attributes`,
      {}
    );
  }

  // Reindex categories (Admin)
  reindexCategories(): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.baseUrl}/catalog/api/v1/re-index/categories`,
      {}
    );
  }

  // Reindex all (Admin)
  reindexAll(): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
      `${this.baseUrl}/catalog/api/v1/re-index/all`,
      {}
    );
  }
}
