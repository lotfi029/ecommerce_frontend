import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  parse(error: HttpErrorResponse): {
    generalMessage: string;
    fieldErrors: Record<string, string[]>;
  } {
    const fieldErrors: Record<string, string[]> = {};
    let generalMessage = 'An error occurred';

    if (error.error?.extensions?.errors) {
      const errors = error.error.extensions.errors as Record<string, string[]>;
      for (const [key, messages] of Object.entries(errors)) {
        if (key.includes('.')) {
          // General error (contains a dot, like "Auth.Login")
          generalMessage = Array.isArray(messages) ? messages[0] : messages;
        } else {
          // Field error
          fieldErrors[key.toLowerCase()] = Array.isArray(messages) ? messages : [messages];
        }
      }
    }

    return { generalMessage, fieldErrors };
  }

  applyToForm(form: any, fieldErrors: Record<string, string[]>): void {
    for (const [fieldName, messages] of Object.entries(fieldErrors)) {
      const control = form.get(fieldName);
      if (control) {
        control.setErrors({ serverError: messages[0] });
      }
    }
  }
}
