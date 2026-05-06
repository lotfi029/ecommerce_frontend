/**
 * Generic API Response Wrappers
 */

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface SuccessResponse<T> {
  isSuccess: boolean;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  isSuccess: boolean;
  data: null;
  message: string;
  errors?: {
    [key: string]: string[];
  };
}
