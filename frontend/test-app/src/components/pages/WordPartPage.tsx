import React, { useEffect, useState } from 'react';
import { DefaultWordPart, type WordPart } from '../../model/library';
import WordPartForm from '../atoms/Form/WordPartForm';
import WordPartCard from '../atoms/Card/WordPartCard';
import WordPartList from '../atoms/List/WordPartList';
import api from '../../api';

const WordPartPage: React.FC = () => {
  const [isLoadingWordParts, setIsLoadingWordParts] = useState<boolean>(true);
  const [wordParts, setWordParts] = useState<WordPart[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<WordPart>(DefaultWordPart);

  const filteredWordParts = wordParts.filter((wp: WordPart) =>
    wp.value.toLowerCase().includes(search.toLowerCase()) ||
    wp.definition.toLowerCase().includes(search.toLowerCase())
  );
  const sortedWordParts = [...filteredWordParts].sort((a, b) => a.value.localeCompare(b.value));
  const selectedWordPart = sortedWordParts[selectedIdx] || sortedWordParts[0];

  useEffect(() => {
    if (sortedWordParts.length === 0) return;
    if (!sortedWordParts[selectedIdx]) setSelectedIdx(0);
  }, [search, sortedWordParts.length, sortedWordParts, selectedIdx]);

  const loadWordPartsRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=word-parts')
      .then(response => setWordParts(JSON.parse(response.data.records)))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingWordParts(false) });
  }

  useEffect(() => {
    if (isLoadingWordParts) {
      loadWordPartsRecords();
    }
  }, [isLoadingWordParts]);

  const handleSubmit = (wordparts: WordPart[]) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'word-parts',
      records: JSON.stringify(wordparts)
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }


  const handleAddWordPart = (form: WordPart) => {
    setWordParts(prev => {
      const updatedWordParts = [{ ...form }, ...prev];
      handleSubmit(updatedWordParts);
      return updatedWordParts;
    });
    setSearch('');
    setSelectedIdx(0);
  };

  const handleEditWordPart = (form: WordPart) => {
    setWordParts(prev => {
      const updatedWordParts = prev.map((wp, idx) =>
        idx === selectedIdx
          ? { ...form }
          : wp);
      handleSubmit(updatedWordParts);
      return updatedWordParts;
    });
    setIsEditing(false);
    setEditForm(DefaultWordPart);
  };

  const startEdit = () => {
    setEditForm({ ...selectedWordPart });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(DefaultWordPart);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Word Part</h1>
      <div className="page-body-layout">
        <WordPartList
          wordParts={sortedWordParts}
          selectedIdx={selectedIdx}
          search={search}
          onSearchChange={setSearch}
          onSelectWordPart={setSelectedIdx}
        />
        {sortedWordParts.length > 0 && (
          <WordPartCard wordPart={selectedWordPart} onEdit={startEdit} />
        )}
        <WordPartForm onSubmit={isEditing ? handleEditWordPart : handleAddWordPart} initialValues={editForm} isEditing={isEditing} cancelEdit={cancelEdit} />
      </div>
    </div>
  );
};

export default WordPartPage; 