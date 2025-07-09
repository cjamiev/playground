import React, { useState, useEffect } from 'react';
import { type Film } from '../../model/library';

interface FilmFormProps {
  onSubmit: (form: Film) => void;
  initialValues?: Film;
  isEditing: boolean;
  cancelEdit: () => void;
}

function FilmForm({ onSubmit, initialValues, isEditing, cancelEdit }: FilmFormProps) {
  const [form, setForm] = useState<Film>({
    name: '',
    rank: 1,
    service: '',
    tags: '',
  });

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'rank' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', rank: 1, service: '', tags: '' });
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="form-title">{isEditing ? 'Updating existing' : 'Add a New Film'}</div>
      <label className="form-label">
        Film Name:
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>
      <label className="form-label">
        Service:
        <input
          type="text"
          name="service"
          value={form.service}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Rank:
        <input
          type="range"
          name="rank"
          value={form.rank}
          min={1}
          max={5}
          onChange={handleChange}
          className="form-input"
        />
        <span>{form.rank}</span>
      </label>
      <label className="form-label">
        Tags (comma separated):
        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <div>
        <button
          type="submit"
          className="form-submit"
        >
          Submit
        </button>
        {isEditing && <button
          onClick={cancelEdit}
          className="cancel-btn"
        >
          Cancel
        </button>}
      </div>
    </form>
  );
}

export default FilmForm; 