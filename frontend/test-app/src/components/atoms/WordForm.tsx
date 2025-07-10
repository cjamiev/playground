import React, { useState, useEffect } from 'react';
import { WORD_TYPE, type Word } from '../../model/library';

interface WordFormProps {
  onSubmit: (form: Word) => void;
  initialValues?: Word;
  isEditing: boolean;
  cancelEdit: () => void;
}

function WordForm({ onSubmit, initialValues, isEditing, cancelEdit }: WordFormProps) {
  const [form, setForm] = useState({
    value: '',
    definition: '',
    type: WORD_TYPE.noun,
    tags: '',
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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ value: '', definition: '', type: WORD_TYPE.noun, tags: '' });
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="form-title">{isEditing ? 'Update Existing' : 'Add a New Word'}</div>
      <label className="form-label">
        Word:
        <input
          type="text"
          name="value"
          value={form.value}
          onChange={handleChange}
          required
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
        Type:
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="noun">Noun</option>
          <option value="adjective">Adjective</option>
          <option value="verb">Verb</option>
        </select>
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

export default WordForm; 