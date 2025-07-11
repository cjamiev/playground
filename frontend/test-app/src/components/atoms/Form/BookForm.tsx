import React, { useState, useEffect } from 'react';
import { type Book } from '../../../model/library';

interface BookFormProps {
  onSubmit: (form: Book) => void;
  initialValues?: Book;
  isEditing: boolean;
  cancelEdit: () => void;
}

function BookForm({ onSubmit, initialValues, isEditing, cancelEdit }: BookFormProps) {
  const [form, setForm] = useState<Book>({
    name: '',
    isComic: false,
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
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? target.checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', isComic: false, tags: '' });
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="form-title">{isEditing ? 'Update Existing' : 'Add a New Book'}</div>
      <label className="form-label">
        Book Name:
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
        Is Comic:
        <input
          type="checkbox"
          name="isComic"
          checked={form.isComic}
          onChange={handleChange}
          className="form-wrapper-checkbox"
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

export default BookForm; 