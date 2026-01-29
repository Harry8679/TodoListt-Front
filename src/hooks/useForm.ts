import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { FormErrors, ValidationRules } from '../types/auth.types';
import { validateField, validateForm } from '../utils/validation';

interface UseFormProps<T> {
  initialValues: T;
  validationRules: ValidationRules;
  onSubmit: (values: T) => void | Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: FormErrors;
  isSubmitting: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFieldValue: (field: keyof T, value: string) => void;
  setFieldError: (field: string, error: string) => void;
  clearErrors: () => void;
  resetForm: () => void;
}

/**
 * Hook personnalisé pour gérer l'état et la validation des formulaires
 */
export function useForm<T extends Record<keyof T, string>>({
  initialValues,
  validationRules,
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Gérer le changement d'un champ
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Mettre à jour la valeur
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Valider le champ en temps réel
    if (errors[name]) {
      const error = validateField(value, validationRules[name], {
        ...values,
        [name]: value,
      });

      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      } else {
        // Effacer l'erreur si le champ est valide
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  /**
   * Définir manuellement la valeur d'un champ
   */
  const setFieldValue = (field: keyof T, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Définir manuellement une erreur pour un champ
   */
  const setFieldError = (field: string, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  /**
   * Effacer toutes les erreurs
   */
  const clearErrors = () => {
    setErrors({});
  };

  /**
   * Réinitialiser le formulaire
   */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  /**
   * Gérer la soumission du formulaire
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valider tous les champs
    const validationErrors = validateForm(values, validationRules);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Soumettre le formulaire
    setIsSubmitting(true);

    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Erreur de soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
    clearErrors,
    resetForm,
  };
}