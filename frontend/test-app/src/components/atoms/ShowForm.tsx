import React, { useState, useEffect } from 'react';
import { type Show } from '../../model/library';

interface ShowFormProps {
  onSubmit: (form: Show) => void;
  initialValues?: Show;
  isEditing: boolean;
  cancelEdit: () => void;
}

function ShowForm({ onSubmit, initialValues, isEditing, cancelEdit }: ShowFormProps) {
  const [form, setForm] = useState<Show>({
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
      <div className="form-title">{isEditing ? 'Update Existing' : 'Add a New Show'}</div>
      <label className="form-label">
        Show Name:
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

export default ShowForm; 