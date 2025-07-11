import React, { useEffect, useState } from 'react';
import api from '../../api';


const HomePage: React.FC = () => {
  const [isLoadingReadme, setIsLoadingReadme] = useState<boolean>(true);
  const [readme, setReadme] = useState<string>("");
  const [editValue, setEditValue] = useState(readme);
  const [isEditing, setIsEditing] = useState(false);

  const backupRecords = () => {
    api.get('http://localhost:3000/library/backup')
      .then(response => console.log(response))
      .catch(error => console.error('Error:', error))
  }

  const loadReadmeRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=readme')
      .then(response => setReadme(response.data.records))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingReadme(false) });
  }

  useEffect(() => {
    if (isLoadingReadme) {
      loadReadmeRecords();
    }
  }, [isLoadingReadme]);

  const handleSubmit = (readme: string) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'readme',
      records: readme
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleEdit = () => {
    setEditValue(readme);
    setIsEditing(true);
  };

  const handleSave = () => {
    setReadme(editValue);
    setIsEditing(false);
    handleSubmit(editValue)
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(readme);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Home</h1>
      <div className="home-editable-text">
        {isEditing ? (
          <>
            <textarea
              className="readme-edit"
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              rows={4}
            />
            <div>
              <button className="add-new-btn" onClick={handleSave} style={{ marginRight: 8 }}>Save</button>
              <button className="sidebar-close-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <div className="readme-view">{readme}</div>
            <button className="add-new-btn" onClick={handleEdit}>Edit</button>
          </>
        )}
      </div>
      <button className="add-new-btn" onClick={backupRecords}>Backup</button>
    </div>
  );
};

export default HomePage; 