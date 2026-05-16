// ── Clients ───────────────────────────────────────────────────────────────────
export interface ClientResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  isActive: boolean;
  phoneNumber: string | null;
  address: string | null;
  notes: string | null;
}

export interface CreateClientRequest {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  phone: string;
  address: string;
  notes?: string;
}
