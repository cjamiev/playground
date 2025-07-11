import React, { useState, useEffect } from 'react';
import { type Phrase } from '../../../model/library';

interface PhraseFormProps {
  onSubmit: (form: Phrase) => void;
  initialValues?: Phrase;
  isEditing: boolean;
  cancelEdit: () => void;
}

function PhraseForm({ onSubmit, initialValues, isEditing, cancelEdit }: PhraseFormProps) {
  const [form, setForm] = useState({
    id: '',
    value: '',
    origin: '',
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
    setForm({ id: '', value: '', origin: '', tags: '' });
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="form-title">{isEditing ? 'Update Existing' : 'Add a New Phrase'}</div>
      <label className="form-label">
        Phrase:
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

export default PhraseForm; 