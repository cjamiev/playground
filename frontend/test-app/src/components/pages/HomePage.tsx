import React from 'react';

const DEFAULT_TEXT = 'Welcome to your Home Page! You can edit this text.';

const HomePage: React.FC = () => {
  const [text, setText] = React.useState(DEFAULT_TEXT);
  const [editValue, setEditValue] = React.useState(text);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEdit = () => {
    setEditValue(text);
    setIsEditing(true);
  };

  const handleSave = () => {
    setText(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(text);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Home</h1>
      <div className="home-editable-text">
        {isEditing ? (
          <>
            <textarea
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              rows={4}
              style={{ width: '100%', fontSize: '16px', marginBottom: '12px' }}
            />
            <div>
              <button className="add-new-btn" onClick={handleSave} style={{ marginRight: 8 }}>Save</button>
              <button className="sidebar-close-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 12, fontSize: '18px' }}>{text}</div>
            <button className="add-new-btn" onClick={handleEdit}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage; 