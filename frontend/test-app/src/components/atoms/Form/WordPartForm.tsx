import React from 'react';
import { type WordPart, WORD_PART_TYPE } from '../../../model/library';

interface WordPartFormProps {
  onSubmit: (form: WordPart) => void;
  initialValues: WordPart;
  isEditing: boolean;
  cancelEdit: () => void;
}

const WordPartForm: React.FC<WordPartFormProps> = ({ onSubmit, initialValues, isEditing, cancelEdit }) => {
  const [form, setForm] = React.useState<WordPart>(initialValues);

  React.useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, type: Number(e.target.value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="form-title">{isEditing ? 'Updating existing' : 'Add a Word Part'}</div>
      <label className="form-label">
        Value
        <input
          name="value"
          value={form.value}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>
      <label className="form-label">
        Definition
        <textarea
          name="definition"
          value={form.definition}
          onChange={handleChange}
          className="form-textarea"
        />
      </label>
      <label className="form-label">
        Type
        <select name="type" className="form-select" value={form.type} onChange={handleTypeChange} required>
          {Object.keys(WORD_PART_TYPE)
            .filter(k => !isNaN(Number(k)))
            .map((k) => (
              <option key={k} value={k}>{WORD_PART_TYPE[Number(k)]}</option>
            ))}
        </select>
      </label>
      <div>
        <button type="submit" className="form-submit">
          Submit
        </button>
        {isEditing && (
          <button type="button" className="cancel-btn" onClick={cancelEdit} style={{ marginLeft: 8 }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default WordPartForm; 