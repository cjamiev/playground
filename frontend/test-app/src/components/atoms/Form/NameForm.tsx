import React, { useState, useEffect } from 'react';
import { GENDER_TYPE, type Name } from '../../../model/library';

interface NameFormProps {
  onSubmit: (form: Name) => void;
  initialValues?: Name;
  isEditing: boolean;
  cancelEdit: () => void;
}

function NameForm({ onSubmit, initialValues, isEditing, cancelEdit }: NameFormProps) {
  const [form, setForm] = useState({
    value: '',
    gender: GENDER_TYPE.male,
    origin: '',
  });

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ value: '', gender: GENDER_TYPE.male, origin: '' });
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="form-title">{isEditing ? 'Update Existing' : 'Add a New Name'}</div>
      <label className="form-label">
        Name:
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
        Gender:
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
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

export default NameForm; 