import React, { useState, useEffect } from 'react';
import { type Favorite, FAVORITE_TYPE } from '../../model/library';

interface FavoriteFormProps {
  onSubmit: (form: Favorite) => void;
  initialValues?: Favorite;
  isEditing: boolean;
  cancelEdit: () => void;
}

function FavoriteForm({ onSubmit, initialValues, isEditing, cancelEdit }: FavoriteFormProps) {
  const [form, setForm] = useState<Favorite>({
    name: '',
    link: '',
    type: FAVORITE_TYPE.other,
    tags: '',
    notes: '',
  });

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'type' ? Number(value) as FAVORITE_TYPE : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', link: '', type: FAVORITE_TYPE.other, tags: '', notes: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-title">{isEditing ? 'Updating existing' : 'Add a New Favorite'}</div>
      <label className="form-label">
        Name:
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
        Link:
        <input
          type="url"
          name="link"
          value={form.link}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Type:
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="form-input"
        >
          <option value={FAVORITE_TYPE.art}>Art</option>
          <option value={FAVORITE_TYPE.music}>Music</option>
          <option value={FAVORITE_TYPE.game}>Game</option>
          <option value={FAVORITE_TYPE.programming}>Programming</option>
          <option value={FAVORITE_TYPE.entertainment}>Entertainment</option>
          <option value={FAVORITE_TYPE.other}>Other</option>
        </select>
      </label>
      <label className="form-label">
        Tags:
        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="comma,separated,tags"
          className="form-input"
        />
      </label>
      <label className="form-label">
        Notes:
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="form-input"
          rows={3}
        />
      </label>
      <div>
        <button type="submit" className="form-submit">
          Submit
        </button>
        {isEditing && (
          <button type="button" onClick={cancelEdit} className="form-cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default FavoriteForm; 