// ── Audit ─────────────────────────────────────────────────────────────────────
export interface AuditLogResponse {
  id: string;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  ipAddress: string | null;
  action: string;
  entityName: string;
  entityId: string | null;
  module: string | null;
  description: string | null;
  outcome: string;
  failureReason: string | null;
  oldValues: string | null;
  newValues: string | null;
  changedColumns: string | null;
  requestPath: string | null;
  requestMethod: string | null;
  durationMs: number | null;
  timestamp: string;
}

export interface AuditPagedResult {
  items: AuditLogResponse[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AuditQueryParams {
  page?: number;
  pageSize?: number;
  userId?: string;
  action?: string;
  entityName?: string;
  startDate?: string;
  endDate?: string;
}
