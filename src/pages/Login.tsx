import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import AuthLayout from '../components/layout/AuthLayout';
import { useForm } from '../hooks/useForm';
import type { LoginFormData } from '../types/auth.types';
import { loginValidationRules } from '../utils/validation';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

/**
 * Page de connexion avec formulaire complet
 */
export const Login: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  // Utilisation du hook useForm pour gérer le formulaire
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationRules: loginValidationRules,
    onSubmit: handleLogin,
  });

  /**
   * Fonction appelée lors de la soumission du formulaire
   */
  async function handleLogin(formData: LoginFormData) {
    try {
      // Appel à l'API backend pour la connexion
      const { user } = await authService.login(formData);

      console.log('Utilisateur connecté:', user);
      console.log('Se souvenir de moi:', rememberMe);

      // Afficher le message de succès
      setSuccessMessage('Connexion réussie ! Redirection...');
      setErrorMessage('');

      // Rediriger vers le dashboard après 2 secondes
      setTimeout(() => {
        navigate('/tableau-de-bord');
      }, 2000);

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Une erreur est survenue lors de la connexion');
      }
      setSuccessMessage('');
    }
  }

  return (
    <AuthLayout 
      title="Connexion" 
      subtitle="Connectez-vous à votre compte"
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
          placeholder="Entrez votre mot de passe"
          required
          autoComplete="current-password"
          showStrengthIndicator={false}
        />

        {/* Options : Se souvenir de moi & Mot de passe oublié */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-slate-700">
              Se souvenir de moi
            </label>
          </div>

          <Link
            to="/forgot-password"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Bouton de soumission */}
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Se connecter
        </Button>

        {/* Séparateur */}
        <div className="relative py-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500">
              Vous n'avez pas de compte ?
            </span>
          </div>
        </div>

        {/* Lien vers l'inscription */}
        <Link to="/inscription">
          <Button type="button" variant="secondary">
            Créer un compte
          </Button>
        </Link>
      </form>
    </AuthLayout>
  );
};