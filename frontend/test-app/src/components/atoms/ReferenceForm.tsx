import React, { useState, useEffect } from 'react';
import { type Reference } from '../../model/library';

interface ReferenceFormProps {
  onSubmit: (form: Reference) => void;
  initialValues?: Reference;
  isEditing: boolean;
  cancelEdit: () => void;
}

function ReferenceForm({ onSubmit, initialValues, isEditing, cancelEdit }: ReferenceFormProps) {
  const [form, setForm] = useState({
    id: '',
    value: '',
    origin: '',
    definition: '',
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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ id: '', value: '', origin: '', definition: '', tags: '' });
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="form-title">{isEditing ? 'Update Existing' : 'Add a New Reference'}</div>
      <label className="form-label">
        Reference:
        <textarea
          name="value"
          value={form.value}
          onChange={handleChange}
          required
          className="form-textarea"
        />
      </label>
      <label className="form-label">
        Origin:
        <input
          type="text"
          name="origin"
          value={form.origin}
          onChange={handleChange}
          className="form-input"
        />
      </label>
      <label className="form-label">
        Definition:
        <textarea
          name="definition"
          value={form.definition}
          onChange={handleChange}
          className="form-textarea"
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

export default ReferenceForm; 