import React, { useState, useEffect } from 'react';
import FilmForm from '../atoms/Form/FilmForm';
import FilmCard from '../atoms/Card/FilmCard';
import FilmList from '../atoms/List/FilmList';
import { DefaultFilm, type Film } from '../../model/library';
import api from '../../api';

const FilmPage: React.FC = () => {
  const [isLoadingFilms, setIsLoadingFilms] = useState<boolean>(true);
  const [films, setFilms] = useState<Film[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Film>(DefaultFilm);

  const filteredFilms = films.filter((f: Film) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.service.toLowerCase().includes(search.toLowerCase()) ||
    f.tags.split(',').some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedFilms = [...filteredFilms].sort((a, b) => a.rank - b.rank);
  const selectedFilm = sortedFilms[selectedIdx] || sortedFilms[0];

  useEffect(() => {
    if (sortedFilms.length === 0) return;
    if (!sortedFilms[selectedIdx]) setSelectedIdx(0);
  }, [search, sortedFilms.length, sortedFilms, selectedIdx]);

  const loadFilmRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=films')
      .then(response => setFilms(JSON.parse(response.data.records)))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingFilms(false) });
  }

  useEffect(() => {
    if (isLoadingFilms) {
      loadFilmRecords();
    }
  }, [isLoadingFilms]);

  const handleSubmit = (films: Film[]) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'films',
      records: JSON.stringify(films)
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleAddFilm = (form: Film) => {
    const newFilm = {
      name: form.name,
      rank: form.rank,
      service: form.service,
      tags: form.tags,
    };
    setFilms(prev => {
      const updatedFilms = [newFilm, ...prev];
      handleSubmit(updatedFilms);
      return updatedFilms;
    });
    setSearch('');
    setSelectedIdx(0);
  };

  const handleEditFilm = (form: Film) => {
    setFilms(prev => {
      const updatedFilms = prev.map((f) =>
        f.name === selectedFilm.name
          ? {
            name: form.name,
            rank: form.rank,
            service: form.service,
            tags: form.tags,
          }
          : f
      ).filter((w) => w.name !== 'delete');
      handleSubmit(updatedFilms);
      return updatedFilms;
    });
    setIsEditing(false);
    setEditForm(DefaultFilm);
  };

  const startEdit = () => {
    setEditForm({
      name: selectedFilm.name,
      rank: selectedFilm.rank,
      service: selectedFilm.service,
      tags: selectedFilm.tags,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(DefaultFilm);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Films</h1>
      <div className="page-body-layout">
        <FilmList
          films={sortedFilms}
          selectedIdx={selectedIdx}
          search={search}
          onSearchChange={setSearch}
          onSelectFilm={setSelectedIdx}
        />
        {sortedFilms.length > 0 && (
          <FilmCard film={selectedFilm} onEdit={startEdit} />
        )}
        <FilmForm onSubmit={isEditing ? handleEditFilm : handleAddFilm} initialValues={editForm} isEditing={isEditing} cancelEdit={cancelEdit} />
      </div>
    </div>
  );
};

export default FilmPage; 