import React, { useEffect, useState } from 'react';
import FavoriteLink from '../atoms/FavoriteLink';
import FavoriteSidebar from '../atoms/FavoriteSidebar';
import { DefaultFavorite, FAVORITE_TYPE, type Favorite } from '../../model/library';
import api from '../../api';

const FavoritePage: React.FC = () => {
  const [isLoadingFavorites, setIsLoadingFavorites] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Favorite>(DefaultFavorite);
  const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sortedFavorites = [...favorites].sort((a, b) => a.name.localeCompare(b.name));

  // Filter by search
  const filteredFavorites = sortedFavorites.filter(fav => {
    const searchLower = search.toLowerCase();
    const nameMatch = fav.name.toLowerCase().includes(searchLower);
    const tagsMatch = fav.tags
      .split(',')
      .some(tag => tag.trim().toLowerCase().includes(searchLower));
    return nameMatch || tagsMatch;
  });

  // Group favorites by type
  const groupedFavorites = filteredFavorites.reduce((groups, favorite) => {
    const type = favorite.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(favorite);
    return groups;
  }, {} as Record<FAVORITE_TYPE, Favorite[]>);

  const getTypeDisplayName = (type: FAVORITE_TYPE): string => {
    switch (type) {
      case FAVORITE_TYPE.art: return 'Art';
      case FAVORITE_TYPE.music: return 'Music';
      case FAVORITE_TYPE.game: return 'Games';
      case FAVORITE_TYPE.programming: return 'Programming';
      case FAVORITE_TYPE.entertainment: return 'Entertainment';
      case FAVORITE_TYPE.other: return 'Other';
      default: return 'Other';
    }
  };

  const loadFavoriteRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=favorites')
      .then(response => setFavorites(JSON.parse(response.data.records)))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingFavorites(false) });
  }

  useEffect(() => {
    if (isLoadingFavorites) {
      loadFavoriteRecords();
    }
  }, [isLoadingFavorites]);

  const handleSubmit = (favorites: Favorite[]) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'favorites',
      records: JSON.stringify(favorites)
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleFavoriteClick = (favorite: Favorite) => {
    setSelectedFavorite(favorite);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedFavorite(null);
  };

  const handleSidebarEdit = (favorite: Favorite) => {
    setEditForm({
      name: favorite.name,
      link: favorite.link,
      type: favorite.type,
      tags: favorite.tags,
      notes: favorite.notes,
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditForm(DefaultFavorite);
    setIsEditing(true);
    setSelectedFavorite(DefaultFavorite);
    setIsSidebarOpen(true);
  };

  const handleFormSubmit = (form: Favorite) => {
    if (isEditing && selectedFavorite && selectedFavorite.name !== DefaultFavorite.name) {
      setFavorites(prev => {
        const updatedFavorites = prev.map((f) =>
          f.name === selectedFavorite.name
            ? {
              name: form.name,
              link: form.link,
              type: form.type,
              tags: form.tags,
              notes: form.notes,
            }
            : f);

        handleSubmit(updatedFavorites);
        return updatedFavorites;
      }
      );
    } else {
      const newFavorite = {
        name: form.name,
        link: form.link,
        type: form.type,
        tags: form.tags,
        notes: form.notes,
      };
      setFavorites(prev => {
        const updatedFavorites = [newFavorite, ...prev];
        handleSubmit(updatedFavorites);
        return updatedFavorites;
      });
    }
    setIsEditing(false);
    setEditForm(DefaultFavorite);
    closeSidebar();
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(DefaultFavorite);
  };

  // Compute all unique tags
  const allTags = Array.from(
    new Set(
      favorites.flatMap(fav => fav.tags.split(',').map(tag => tag.trim()).filter(Boolean))
    )
  ).sort((a, b) => a.localeCompare(b));

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Favorite</h1>

      {/* Search Bar */}
      <div className="favorite-search-bar">
        <input
          type="text"
          placeholder="Search favorites by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="small-cards-section">
        <div className="section-header">
          <h2>Quick Access</h2>
          <button className="add-new-btn" onClick={handleAddNew}>
            Add New
          </button>
        </div>
        <div className="favorite-type-group-wrapper">
          {Object.entries(groupedFavorites).map(([type, typeFavorites]) => (
            <div key={type} className="favorite-type-group">
              <h3>{getTypeDisplayName(Number(type) as FAVORITE_TYPE)}</h3>
              <div className="small-cards-container">
                {typeFavorites.map((favorite, index) => (
                  <FavoriteLink
                    key={index}
                    favorite={favorite}
                    onFavoriteClick={handleFavoriteClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <FavoriteSidebar
        favorite={selectedFavorite}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        onEdit={handleSidebarEdit}
        onSubmit={handleFormSubmit}
        editForm={editForm}
        isEditing={isEditing}
        onCancelEdit={cancelEdit}
        allTags={allTags}
      />
    </div>
  );
};

export default FavoritePage; 