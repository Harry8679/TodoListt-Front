import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import taskService from '../services/task.service';
// import type { Task } from '../types/api.types';
import { TaskItem } from '../components/tasks/TaskItem';
import { TaskForm } from '../components/tasks/TaskForm';
import { Alert } from '../components/ui/Alert';
import type { Task } from '../types/task.types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

//   const [tasks, setTasks] = useState<Task[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Charger les tâches au montage du composant
  useEffect(() => {
    loadTasks();
  }, []);

  /**
   * Charger toutes les tâches
   */
  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
      setError('');
    } catch (error) {
      setError('Impossible de charger les tâches');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Créer ou mettre à jour une tâche
   */
  const handleSubmitTask = async (title: string, description: string) => {
    try {
      if (editingTask) {
        // Mise à jour
        const updatedTask = await taskService.updateTask(editingTask._id, {
          title,
          description,
        });
        setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
      } else {
        // Création
        const newTask = await taskService.createTask({ title, description });
        setTasks([newTask, ...tasks]);
      }

      setShowForm(false);
      setEditingTask(null);
      setError('');
    } catch (error) {
      setError('Erreur lors de la sauvegarde de la tâche');
      console.error(error);
    }
  };

  /**
   * Basculer le statut d'une tâche
   */
  const handleToggleTask = async (taskId: string, completed: boolean) => {
    try {
      const updatedTask = await taskService.toggleTaskCompletion(taskId, completed);
      setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    } catch (error) {
      setError('Erreur lors de la mise à jour');
      console.error(error);
    }
  };

  /**
   * Supprimer une tâche
   */
  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      try {
        await taskService.deleteTask(taskId);
        setTasks(tasks.filter((t) => t._id !== taskId));
      } catch (error) {
        setError('Erreur lors de la suppression');
        console.error(error);
      }
    }
  };

  /**
   * Éditer une tâche
   */
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  /**
   * Déconnexion
   */
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  // Filtrer les tâches
  const filteredTasks = (tasks ?? []).filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
//   const filteredTasks = tasks.filter((task) => {
//     if (filter === 'active') return !task.completed;
//     if (filter === 'completed') return task.completed;
//     return true;
//   });

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-primary-600 to-primary-400 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Ma Todo List</h1>
              <p className="text-sm text-slate-600">Bonjour, {user?.name} 👋</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Total</p>
            <p className="text-2xl font-bold text-slate-900">{tasks.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">En cours</p>
            <p className="text-2xl font-bold text-primary-600">{activeCount}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-sm text-slate-600 mb-1">Terminées</p>
            <p className="text-2xl font-bold text-green-600">{completedCount}</p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError('')} />
        )}

        {/* Add Task Button */}
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingTask(null);
            }}
            className="w-full mb-6 py-4 bg-white border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter une tâche
          </button>
        )}

        {/* Task Form */}
        {showForm && (
          <div className="mb-6">
            <TaskForm
              onSubmit={handleSubmitTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
              editingTask={editingTask}
            />
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === f
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f === 'all' && 'Toutes'}
              {f === 'active' && 'En cours'}
              {f === 'completed' && 'Terminées'}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-slate-600">Chargement...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <svg
              className="w-16 h-16 text-slate-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-slate-600">Aucune tâche pour le moment</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};