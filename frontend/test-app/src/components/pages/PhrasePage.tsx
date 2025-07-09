import React, { useState, useEffect } from 'react';
import PhraseForm from '../atoms/PhraseForm';
import PhraseCard from '../atoms/PhraseCard';
import PhraseList from '../atoms/PhraseList';
import { DefaultPhrase, type Phrase } from '../../model/library';
import api from '../../api';

const PhrasePage: React.FC = () => {
  const [isLoadingPhrases, setIsLoadingPhrases] = useState<boolean>(true);
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Phrase>(DefaultPhrase);

  const filteredPhrases = phrases.filter((p: Phrase) =>
    p.value.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.split(',').some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedPhrases = [...filteredPhrases].sort((a, b) => a.value.localeCompare(b.value));
  const selectedPhrase = sortedPhrases[selectedIdx] || sortedPhrases[0];

  useEffect(() => {
    if (sortedPhrases.length === 0) return;
    if (!sortedPhrases[selectedIdx]) setSelectedIdx(0);
  }, [search, sortedPhrases.length, sortedPhrases, selectedIdx]);

  const loadPhraseRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=phrases')
      .then(response => setPhrases(JSON.parse(response.data.records)))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingPhrases(false) });
  }

  useEffect(() => {
    if (isLoadingPhrases) {
      loadPhraseRecords();
    }
  }, [isLoadingPhrases]);

  const handleSubmit = (phrases: Phrase[]) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'phrases',
      records: JSON.stringify(phrases)
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleAddPhrase = (form: Phrase) => {
    const newPhrase = {
      id: String(phrases.length + 1),
      value: form.value,
      origin: form.origin,
      tags: form.tags,
    };
    setPhrases(prev => {
      const updatedPhrases = [newPhrase, ...prev];
      handleSubmit(updatedPhrases);
      return updatedPhrases;
    });
    setSearch('');
    setSelectedIdx(0);
  };

  const handleEditPhrase = (form: Phrase) => {
    setPhrases(prev => {
      const updatedPhrases = prev.map((p) =>
        p.id === selectedPhrase.id
          ? {
            id: p.id,
            value: form.value,
            origin: form.origin,
            tags: form.tags,
          }
          : p
      )
      handleSubmit(updatedPhrases);
      return updatedPhrases;
    });
    setIsEditing(false);
    setEditForm(DefaultPhrase);
  };

  const startEdit = () => {
    setEditForm({
      id: selectedPhrase.id,
      value: selectedPhrase.value,
      origin: selectedPhrase.origin,
      tags: selectedPhrase.tags,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(DefaultPhrase);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Phrase</h1>
      <div className="page-body-layout">
        <PhraseList
          phrases={sortedPhrases}
          selectedIdx={selectedIdx}
          search={search}
          onSearchChange={setSearch}
          onSelectPhrase={setSelectedIdx}
        />
        {sortedPhrases.length > 0 && (
          <PhraseCard phrase={selectedPhrase} onEdit={startEdit} />
        )}
        <PhraseForm onSubmit={isEditing ? handleEditPhrase : handleAddPhrase} initialValues={editForm} isEditing={isEditing} cancelEdit={cancelEdit} />
      </div>
    </div>
  );
};

export default PhrasePage; 