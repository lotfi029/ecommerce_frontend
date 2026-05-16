// ── Departments ───────────────────────────────────────────────────────────────
export interface DepartmentResponse {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  departmentHead?: string | null;
}

export interface CreateDepartmentRequest {
  name: string;
  description?: string;
}

export interface UpdateDepartmentRequest {
  name: string;
  description?: string;
}

export interface DepartmentUserRequest {
  userId: string;
}
