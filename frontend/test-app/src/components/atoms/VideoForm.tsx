import React, { useState, useEffect } from 'react';
import { type Video } from '../../model/library';

interface VideoFormProps {
  onSubmit: (form: Video) => void;
  initialValues?: Video;
  isEditing: boolean;
  cancelEdit: () => void;
}

function VideoForm({ onSubmit, initialValues, isEditing, cancelEdit }: VideoFormProps) {
  const [form, setForm] = useState<Video>({
    name: '',
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
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', link: '', tags: '' });
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <div className="form-title">{isEditing ? 'Updating existing' : 'Add a New Video'}</div>
      <label className="form-label">
        Video Name:
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

export default VideoForm; 