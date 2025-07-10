import React from 'react';
import { type Favorite } from '../../model/library';

interface FavoriteLinkProps {
  favorite: Favorite;
  onFavoriteClick: (favorite: Favorite) => void;
}

const FavoriteLink: React.FC<FavoriteLinkProps> = ({ favorite, onFavoriteClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onFavoriteClick(favorite);
  };

  return (
    <div className="small-card-wrapper">
      <a
        href={favorite.link}
        target="_blank"
        rel="noopener noreferrer"
        className="small-card-link"
        title={favorite.notes}
        onClick={handleClick}
      >
        {favorite.name}
      </a>
    </div>
  );
};

export default FavoriteLink; 