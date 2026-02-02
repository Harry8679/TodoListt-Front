import type { Task } from '../types/task.types';
import apiClient from './api.service';

interface CreateTaskData {
  title: string;
  description?: string;
}

interface UpdateTaskData {
  title?: string;
  description?: string;
  completed?: boolean;
}

// interface TasksResponse {
//   success: boolean;
//   tasks: Task[];
// }

interface TaskResponse {
  success: boolean;
  task: Task;
}

class TaskService {
  /**
   * Récupérer toutes les tâches de l'utilisateur
   */
  async getTasks(): Promise<Task[]> {
  try {
    const response = await apiClient.get<Task[]>('/api/tasks');
    return response.data; // ✅ DIRECTEMENT le tableau
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    throw error;
  }
}

  // async getTasks(): Promise<Task[]> {
  //   try {
  //     const response = await apiClient.get<TasksResponse>('/api/tasks');
  //     return response.data.tasks;
  //   } catch (error) {
  //     console.error('Erreur lors de la récupération des tâches:', error);
  //     throw error;
  //   }
  // }

  /**
   * Créer une nouvelle tâche
   */
  async createTask(taskData: CreateTaskData): Promise<Task> {
    const response = await apiClient.post<Task>('/api/tasks', taskData);
    return response.data;
  }
  // async createTask(taskData: CreateTaskData): Promise<Task> {
  //   try {
  //     const response = await apiClient.post<TaskResponse>('/api/tasks', taskData);
  //     return response.data.task;
  //   } catch (error) {
  //     console.error('Erreur lors de la création de la tâche:', error);
  //     throw error;
  //   }
  // }

  /**
   * Mettre à jour une tâche
   */
  async updateTask(taskId: string, taskData: UpdateTaskData): Promise<Task> {
    try {
      const response = await apiClient.put<TaskResponse>(`/api/tasks/${taskId}`, taskData);
      return response.data.task;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
      throw error;
    }
  }

  /**
   * Supprimer une tâche
   */
  async deleteTask(taskId: string): Promise<void> {
    try {
      await apiClient.delete(`/api/tasks/${taskId}`);
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
      throw error;
    }
  }

  /**
   * Basculer le statut d'une tâche (complété/non complété)
   */
  async toggleTaskCompletion(taskId: string, completed: boolean): Promise<Task> {
    try {
      const response = await apiClient.put<TaskResponse>(`/api/tasks/${taskId}`, {
        completed,
      });
      return response.data.task;
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      throw error;
    }
  }
}

export default new TaskService();