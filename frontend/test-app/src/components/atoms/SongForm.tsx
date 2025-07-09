import React, { useState, useEffect } from 'react';
import { type Song } from '../../model/library';

interface SongFormProps {
  onSubmit: (form: Song) => void;
  initialValues?: Song;
  isEditing: boolean;
  cancelEdit: () => void;
}

function SongForm({ onSubmit, initialValues, isEditing, cancelEdit }: SongFormProps) {
  const [form, setForm] = useState<Song>({
    id: '',
    name: '',
    album: '',
    rank: 1,
    link: '',
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
    setForm({ id: '', name: '', album: '', rank: 1, link: '', tags: '' });
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="form-title">{isEditing ? 'Updating existing' : 'Add a New Song'}</div>
      <label className="form-label">
        Song Name:
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
        Album:
        <input
          type="text"
          name="album"
          value={form.album}
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
        Link:
        <input
          type="text"
          name="link"
          value={form.link}
          onChange={handleChange}
          className="form-input"
        />
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

export default SongForm; 