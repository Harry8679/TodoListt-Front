// Types pour les formulaires d'authentification

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
  custom?: (value: string, formData?: Record<string, string>) => boolean;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}