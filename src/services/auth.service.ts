import apiClient from './api.service';
import type { AuthResponse, LoginFormData, RegisterFormData, User } from '../types/auth.types';
import { AxiosError } from 'axios';

class AuthService {
  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(userData: RegisterFormData): Promise<{ user: User; token: string }> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/register', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      const { user, token } = response.data;

      // Sauvegarder le token et l'utilisateur dans le localStorage
      this.saveAuthData(user, token);

      return { user, token };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Connexion de l'utilisateur
   */
  async login(credentials: LoginFormData): Promise<{ user: User; token: string }> {
    try {
      const response = await.post<AuthResponse>('/api/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      const { user, token } = response.data;

      // Sauvegarder le token et l'utilisateur dans le localStorage
      this.saveAuthData(user, token);

      return { user, token };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  /**
   * Récupérer l'utilisateur courant
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');

    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch {
        return null;
      }
    }

    return null;
  }

  /**
   * Récupérer le token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Sauvegarder les données d'authentification
   */
  private saveAuthData(user: User, token: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Gérer les erreurs de l'API
   */
  private handleError(error: unknown): Error {
    // Si c'est une erreur Axios
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        return new Error(error.response.data.message);
      }
      if (error.message) {
        return new Error(error.message);
      }
    }

    // Si c'est une Error standard
    if (error instanceof Error) {
      return error;
    }

    // Fallback pour les erreurs inconnues
    return new Error('Une erreur est survenue. Veuillez réessayer.');
  }
}

export default new AuthService();