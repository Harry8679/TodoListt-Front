import React, { useEffect, useState } from 'react';
import { Input } from '../ui';
import { Button } from '../ui/Button';
import type { Task } from '../../types/api.types';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void;
  editingTask?: Task | null;
  isLoading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  editingTask,
  isLoading = false,
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  // Synchronise le formulaire quand on édite une tâche
  // SOLUTION : Ajouter les valeurs spécifiques dans les dépendances
  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description ?? '',
      });
    } else {
      setForm({ title: '', description: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingTask?.id]); // ✅ Ne dépendre QUE de l'ID

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    onSubmit(form.title.trim(), form.description.trim());

    // Reset après création
    if (!editingTask) {
      setForm({ title: '', description: '' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg border border-slate-200 p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        {editingTask ? 'Modifier la tâche' : 'Nouvelle tâche'}
      </h3>

      <Input
        id="title"
        name="title"
        type="text"
        label="Titre"
        value={form.title}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, title: e.target.value }))
        }
        placeholder="Titre de la tâche"
        required
        disabled={isLoading}
      />

      <div className="mb-5">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Description (optionnelle)
        </label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Description de la tâche..."
          rows={3}
          disabled={isLoading}
          className="input-field resize-none"
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {editingTask ? 'Mettre à jour' : 'Ajouter'}
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
};