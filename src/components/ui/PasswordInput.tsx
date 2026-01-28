import React, { useState } from 'react';

interface PasswordInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  showStrengthIndicator?: boolean;
}

/**
 * Composant Input spécialisé pour les mots de passe
 * Inclut un toggle pour afficher/masquer le mot de passe
 * Optionnel : indicateur de force du mot de passe
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  placeholder = '••••••••',
  required = false,
  disabled = false,
  autoComplete,
  showStrengthIndicator = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Calculer la force du mot de passe
   */
  const getPasswordStrength = (password: string): {
    level: number;
    text: string;
    color: string;
  } => {
    if (!password) return { level: 0, text: '', color: '' };

    let strength = 0;

    // Longueur
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Contient des minuscules
    if (/[a-z]/.test(password)) strength++;

    // Contient des majuscules
    if (/[A-Z]/.test(password)) strength++;

    // Contient des chiffres
    if (/\d/.test(password)) strength++;

    // Contient des caractères spéciaux
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 2) {
      return { level: 1, text: 'Faible', color: 'bg-red-500' };
    } else if (strength <= 4) {
      return { level: 2, text: 'Moyen', color: 'bg-yellow-500' };
    } else {
      return { level: 3, text: 'Fort', color: 'bg-green-500' };
    }
  };

  const passwordStrength = showStrengthIndicator ? getPasswordStrength(value) : null;

  return (
    <div className="mb-5">
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input avec toggle */}
      <div className="relative">
        {/* Icône cadenas */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`
            input-field pl-10 pr-12
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${disabled ? 'bg-slate-100 cursor-not-allowed opacity-60' : ''}
          `}
        />

        {/* Bouton toggle pour afficher/masquer le mot de passe */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none disabled:cursor-not-allowed"
          aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        >
          {showPassword ? (
            // Icône "oeil barré" (masquer)
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          ) : (
            // Icône "oeil" (afficher)
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Indicateur de force du mot de passe */}
      {showStrengthIndicator && value && passwordStrength && (
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-600">Force du mot de passe :</span>
            <span
              className={`font-medium ${
                passwordStrength.level === 1
                  ? 'text-red-600'
                  : passwordStrength.level === 2
                  ? 'text-yellow-600'
                  : 'text-green-600'
              }`}
            >
              {passwordStrength.text}
            </span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  level <= passwordStrength.level
                    ? passwordStrength.color
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <svg
            className="w-4 h-4 mr-1 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};