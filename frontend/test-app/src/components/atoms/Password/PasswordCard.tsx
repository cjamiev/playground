import React, { useState } from 'react';
import { type Password } from '../../../model/library';

interface PasswordCardProps {
  password: Password;
  onEdit: () => void;
  onClone: () => void;
  onDelete: () => void;
}

const PasswordCard: React.FC<PasswordCardProps> = ({ password, onEdit, onClone, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="card-wrapper">
      <div className="card-header">
        <h2 className="card-title">{password.name}</h2>
      </div>
      <div>
        <span className="card-label">Username:</span>
        <span className="card-text">{password.username}</span>
        <button className="copy-btn" onClick={() => copyToClipboard(password.username)} title="Copy username">
          📋
        </button>
      </div>
      <div>
        <span className="card-label">Password:</span>
        <span className="card-text">{showPassword ? password.password : '••••••••'}</span>
        <button
          className="toggle-btn"
          onClick={togglePasswordVisibility}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
        <button className="copy-btn" onClick={() => copyToClipboard(password.password)} title="Copy password">
          📋
        </button>
      </div>
      <div>
        <span className="card-label">Updated:</span> <span className="card-text">{password.updatedDate}</span>
      </div>
      {password.link && (
        <a className="url-link" href={password.link} target="_blank" rel="noopener noreferrer">
          Visit Site
        </a>
      )}
      <div className="card-footer">
        <button className="primary-btn" onClick={onClone}>
          Clone
        </button>
        <button className="primary-btn" onClick={onEdit}>
          Edit
        </button>
        <button className="negative-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PasswordCard;
