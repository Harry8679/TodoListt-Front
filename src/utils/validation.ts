import type { FormErrors, ValidationRules } from '../types/auth.types';

/**
 * Valider une adresse email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valider la force d'un mot de passe
 */
export const isStrongPassword = (password: string): boolean => {
  // Au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return strongPasswordRegex.test(password);
};

/**
 * Valider un champ selon des règles
 */
export const validateField = (
  value: string,
  rules: ValidationRules[string],
  formData?: Record<string, string>
): string | null => {
  // Champ requis
  if (rules.required && !value.trim()) {
    return rules.message || 'Ce champ est requis';
  }

  // Si le champ est vide et non requis, pas d'erreur
  if (!value.trim()) {
    return null;
  }

  // Longueur minimale
  if (rules.minLength && value.length < rules.minLength) {
    return `Minimum ${rules.minLength} caractères requis`;
  }

  // Longueur maximale
  if (rules.maxLength && value.length > rules.maxLength) {
    return `Maximum ${rules.maxLength} caractères`;
  }

  // Pattern (regex)
  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.message || 'Format invalide';
  }

  // Validation personnalisée
  if (rules.custom && !rules.custom(value, formData)) {
    return rules.message || 'Validation échouée';
  }

  return null;
};

/**
 * Valider tout un formulaire
 */
export const validateForm = (
  formData: Record<string, string>,
  rules: ValidationRules
): FormErrors => {
  const errors: FormErrors = {};

  Object.keys(rules).forEach((fieldName) => {
    const error = validateField(formData[fieldName], rules[fieldName], formData);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

/**
 * Règles de validation pour le formulaire d'inscription
 */
export const registerValidationRules: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Le nom doit contenir entre 2 et 50 caractères',
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Adresse email invalide',
  },
  password: {
    required: true,
    minLength: 8,
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  },
  confirmPassword: {
    required: true,
    custom: (value, formData) => {
      if (!formData) return false;
      return value === formData.password;
    },
    message: 'Les mots de passe ne correspondent pas',
  },
};

/**
 * Règles de validation pour le formulaire de connexion
 */
export const loginValidationRules: ValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Adresse email invalide',
  },
  password: {
    required: true,
    message: 'Le mot de passe est requis',
  },
};