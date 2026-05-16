import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientResponse, CreateClientRequest } from '../models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ClientService extends ApiService {
  getById(id: string): Observable<ClientResponse> {
    return this.get<ClientResponse>(`/clients/${id}`);
  }

  create(req: CreateClientRequest): Observable<string> {
    return this.post<string>('/clients', req);
  }
}
