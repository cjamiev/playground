import React from 'react';
import { type Favorite } from '../../model/library';
import FavoriteForm from './FavoriteForm';

interface FavoriteSidebarProps {
  favorite: Favorite | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (favorite: Favorite) => void;
  onSubmit: (form: Favorite) => void;
  editForm: Favorite;
  isEditing: boolean;
  onCancelEdit: () => void;
  allTags: string[];
}

const FavoriteSidebar: React.FC<FavoriteSidebarProps> = ({ 
  favorite, 
  isOpen, 
  onClose, 
  onEdit, 
  onSubmit, 
  editForm, 
  isEditing, 
  onCancelEdit, 
  allTags
}) => {
  if (!favorite && !isEditing) return null;

  return (
    <div className={`favorite-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>{isEditing ? 'Edit Favorite' : 'Favorite Details'}</h3>
        <div className="sidebar-header-actions">
          {!isEditing && favorite && (
            <button className="sidebar-edit-btn" onClick={() => onEdit(favorite)}>
              Edit
            </button>
          )}
          <button className="sidebar-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
      </div>
      
      <div className="sidebar-content">
        {isEditing ? (
          <FavoriteForm 
            onSubmit={onSubmit} 
            initialValues={editForm} 
            isEditing={isEditing} 
            cancelEdit={onCancelEdit} 
          />
        ) : (
          favorite && (
            <>
              <div className="detail-section">
                <h4>Name</h4>
                <p className="detail-value">{favorite.name}</p>
              </div>
              
              <div className="detail-section">
                <h4>Type</h4>
                <p className="detail-value">{favorite.type}</p>
              </div>
              
              <div className="detail-section">
                <h4>Link</h4>
                <a 
                  href={favorite.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="detail-link"
                >
                  {favorite.link}
                </a>
              </div>
              
              <div className="detail-section">
                <h4>Tags</h4>
                <div className="tags-container">
                  {favorite.tags.split(',').map((tag, index) => (
                    <span key={index} className="detail-tag">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Notes</h4>
                <p className="detail-value">{favorite.notes}</p>
              </div>
            </>
          )
        )}
        {isEditing && <div className="detail-section all-tags-section">
          <h4>All Tags</h4>
          <div className="tags-container">
            {allTags.length === 0 ? (
              <span className="detail-tag">No tags</span>
            ) : (
              allTags.map((tag, idx) => (
                <span key={idx} className="detail-tag">{tag}</span>
              ))
            )}
          </div>
        </div>}
      </div>
    </div>
  );
};

export default FavoriteSidebar; 