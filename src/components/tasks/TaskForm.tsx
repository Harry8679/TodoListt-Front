import React, { useState, useEffect } from 'react';
import { Input } from '../ui';
import { Button } from '../ui/Button';
import type { Task } from '../../types/task.types';
// import type { Task } from '../../types/api.types';

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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        {editingTask ? 'Modifier la tâche' : 'Nouvelle tâche'}
      </h3>

      <Input
        id="title"
        name="title"
        type="text"
        label="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la tâche"
        required
        disabled={isLoading}
      />

      <div className="mb-5">
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
          Description (optionnelle)
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description de la tâche..."
          rows={3}
          disabled={isLoading}
          className="input-field resize-none"
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
          {editingTask ? 'Mettre à jour' : 'Ajouter'}
        </Button>

        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          Annuler
        </Button>
      </div>
    </form>
  );
};