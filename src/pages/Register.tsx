import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { useForm } from '../hooks/useForm';
import { RegisterFormData } from '../types/auth.types';
import { registerValidationRules } from '../utils/validation';

/**
 * Page d'inscription avec formulaire complet
 */
export const Register: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Utilisation du hook useForm pour gérer le formulaire
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm<RegisterFormData>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationRules: registerValidationRules,
    onSubmit: handleRegister,
  });

  /**
   * Fonction appelée lors de la soumission du formulaire
   */
  async function handleRegister(formData: RegisterFormData) {
    // Vérifier l'acceptation des CGU
    if (!acceptTerms) {
      setErrorMessage('Vous devez accepter les conditions d\'utilisation');
      return;
    }

    try {
      // Ici, tu appelleras ton API backend
      console.log('Données d\'inscription:', formData);

      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Exemple de réponse réussie
      setSuccessMessage('Inscription réussie ! Redirection...');
      setErrorMessage('');

      // Rediriger après 2 secondes
      setTimeout(() => {
        // window.location.href = '/dashboard';
        console.log('Redirection vers le dashboard...');
      }, 2000);

    } catch (error: any) {
      setErrorMessage(
        error.message || 'Une erreur est survenue lors de l\'inscription'
      );
      setSuccessMessage('');
    }
  }

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Inscrivez-vous pour commencer à gérer vos tâches"
    >
      <form onSubmit={handleSubmit} className="space-y-1">
        {/* Messages d'alerte */}
        {errorMessage && (
          <Alert
            type="error"
            message={errorMessage}
            onClose={() => setErrorMessage('')}
          />
        )}

        {successMessage && (
          <Alert
            type="success"
            message={successMessage}
          />
        )}

        {/* Champ Nom complet */}
        <Input
          id="name"
          name="name"
          type="text"
          label="Nom complet"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Jean Dupont"
          required
          autoComplete="name"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        />

        {/* Champ Email */}
        <Input
          id="email"
          name="email"
          type="email"
          label="Adresse email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="exemple@email.com"
          required
          autoComplete="email"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          }
        />

        {/* Champ Mot de passe */}
        <PasswordInput
          id="password"
          name="password"
          label="Mot de passe"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Minimum 8 caractères"
          required
          autoComplete="new-password"
          showStrengthIndicator={true}
        />

        {/* Champ Confirmation du mot de passe */}
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmer le mot de passe"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Retapez votre mot de passe"
          required
          autoComplete="new-password"
        />

        {/* Checkbox CGU */}
        <div className="flex items-start py-4">
          <input
            id="terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 mt-1 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-slate-700">
            J'accepte les{' '}
            <Link
              to="/terms"
              className="text-primary-600 hover:text-primary-700 font-medium underline"
            >
              conditions d'utilisation
            </Link>{' '}
            et la{' '}
            <Link
              to="/privacy"
              className="text-primary-600 hover:text-primary-700 font-medium underline"
            >
              politique de confidentialité
            </Link>
          </label>
        </div>

        {/* Bouton de soumission */}
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Créer mon compte
        </Button>

        {/* Séparateur */}
        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500">
              Vous avez déjà un compte ?
            </span>
          </div>
        </div>

        {/* Lien vers la connexion */}
        <Link to="/login">
          <Button type="button" variant="secondary">
            Se connecter
          </Button>
        </Link>
      </form>
    </AuthLayout>
  );
};