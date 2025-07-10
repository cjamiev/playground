import React, { useState, useEffect } from 'react';
import { type Game } from '../../model/library';

interface GameFormProps {
  onSubmit: (form: Game) => void;
  initialValues?: Game;
  isEditing: boolean;
  cancelEdit: () => void;
}

function GameForm({ onSubmit, initialValues, isEditing, cancelEdit }: GameFormProps) {
  const [form, setForm] = useState<Game>({
    name: '',
    rank: 1,
    price: '',
    lowestPrice: '',
    releaseDate: '',
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
    setForm({ name: '', rank: 1, price: '', lowestPrice: '', releaseDate: '', tags: '' });
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="form-title">{isEditing ? 'Update Existing' : 'Add a New Game'}</div>
      <label className="form-label">
        Game Name:
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
        Price:
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Lowest Price:
        <input
          type="text"
          name="lowestPrice"
          value={form.lowestPrice}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Release Date:
        <input
          type="date"
          name="releaseDate"
          value={form.releaseDate}
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

export default GameForm; 