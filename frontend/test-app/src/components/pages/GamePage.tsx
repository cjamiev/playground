import React, { useState, useEffect } from 'react';
import GameForm from '../atoms/Form/GameForm';
import GameCard from '../atoms/Card/GameCard';
import GameList from '../atoms/List/GameList';
import { DefaultGame, type Game } from '../../model/library';
import api from '../../api';

const GamePage: React.FC = () => {
  const [isLoadingGames, setIsLoadingGames] = useState<boolean>(true);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Game>(DefaultGame);

  const filteredGames = games.filter((g: Game) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.lowestPrice.toLowerCase().includes(search.toLowerCase()) ||
    g.tags.split(',').some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedGames = [...filteredGames].sort((a, b) => a.rank - b.rank);
  const selectedGame = sortedGames[selectedIdx] || sortedGames[0];

  useEffect(() => {
    if (sortedGames.length === 0) return;
    if (!sortedGames[selectedIdx]) setSelectedIdx(0);
  }, [search, sortedGames.length, sortedGames, selectedIdx]);

  const loadGameRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=games')
      .then(response => setGames(JSON.parse(response.data.records)))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingGames(false) });
  }

  useEffect(() => {
    if (isLoadingGames) {
      loadGameRecords();
    }
  }, [isLoadingGames]);

  const handleSubmit = (games: Game[]) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'games',
      records: JSON.stringify(games)
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleAddGame = (form: Game) => {
    const newGame = {
      name: form.name,
      rank: form.rank,
      price: form.price,
      lowestPrice: form.lowestPrice,
      releaseDate: form.releaseDate,
      tags: form.tags,
    };
    setGames(prev => {
      const updatedGames = [newGame, ...prev];
      handleSubmit(updatedGames);
      return updatedGames;
    });
    setSearch('');
    setSelectedIdx(0);
  };

  const handleEditGame = (form: Game) => {
    setGames(prev => {
      const updatedGames = prev.map((g) =>
        g.name === selectedGame.name
          ? {
            name: form.name,
            rank: form.rank,
            price: form.price,
            lowestPrice: form.lowestPrice,
            releaseDate: form.releaseDate,
            tags: form.tags,
          }
          : g
      ).filter((w) => w.name !== 'delete');
      handleSubmit(updatedGames);
      return updatedGames;
    });
    setIsEditing(false);
    setEditForm(DefaultGame);
  };

  const startEdit = () => {
    setEditForm({
      name: selectedGame.name,
      rank: selectedGame.rank,
      price: selectedGame.price,
      lowestPrice: selectedGame.lowestPrice,
      releaseDate: selectedGame.releaseDate,
      tags: selectedGame.tags,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(DefaultGame);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Games</h1>
      <div className="page-body-layout">
        <GameList
          games={sortedGames}
          selectedIdx={selectedIdx}
          search={search}
          onSearchChange={setSearch}
          onSelectGame={setSelectedIdx}
        />
        {sortedGames.length > 0 && (
          <GameCard game={selectedGame} onEdit={startEdit} />
        )}
        <GameForm onSubmit={isEditing ? handleEditGame : handleAddGame} initialValues={editForm} isEditing={isEditing} cancelEdit={cancelEdit} />
      </div>
    </div>
  );
};

export default GamePage; 