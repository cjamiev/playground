import React, { useEffect, useMemo, useState } from 'react';
import WordForm from '../atoms/Form/WordForm';
import WordCard from '../atoms/Card/WordCard';
import WordList from '../atoms/List/WordList';
import { DefaultWord, type Word } from '../../model/library';
import api from '../../api';

const WordPage: React.FC = () => {
  const [isLoadingWords, setIsLoadingWords] = useState<boolean>(true);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Word>(DefaultWord);

  const filteredWords = words.filter((w: Word) =>
    w.value.toLowerCase().includes(search.toLowerCase()) ||
    w.tags.split(',').some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedWords = useMemo(() => { return [...filteredWords].sort((a, b) => a.value.localeCompare(b.value)) }, [filteredWords]);
  const selectedWord = sortedWords[selectedIdx] || sortedWords[0];

  useEffect(() => {
    if (sortedWords.length === 0) return;
    if (!sortedWords[selectedIdx]) setSelectedIdx(0);
  }, [search, sortedWords.length, sortedWords, selectedIdx]);

  const loadWordRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=words')
      .then(response => setWords(JSON.parse(response.data.records)))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingWords(false) });
  }

  useEffect(() => {
    if (isLoadingWords) {
      loadWordRecords();
    }
  }, [isLoadingWords]);

  const handleSubmit = (words: Word[]) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'words',
      records: JSON.stringify(words)
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleAddWord = (form: Word) => {
    const newWord = {
      value: form.value,
      definition: form.definition,
      type: form.type,
      tags: form.tags,
    };
    setWords(prev => {
      const updatedWords = [newWord, ...prev];
      handleSubmit(updatedWords)
      return updatedWords
    });
    setSearch('');
    setSelectedIdx(0);
  };

  const handleEditWord = (form: Word) => {
    setWords(prev => {
      const updatedWords = prev.map((w) =>
        w.value.toLowerCase() === selectedWord.value.toLowerCase()
          ? {
            value: form.value,
            definition: form.definition,
            type: form.type,
            tags: form.tags,
          }
          : w
      ).filter((w) => w.tags !== 'delete')
      handleSubmit(updatedWords);
      return updatedWords;
    });
    setIsEditing(false);
    setEditForm(DefaultWord);
  };

  const startEdit = () => {
    setEditForm({
      value: selectedWord.value,
      definition: selectedWord.definition,
      type: selectedWord.type,
      tags: selectedWord.tags,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(DefaultWord);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Words</h1>
      <div className="page-body-layout">
        <WordList
          words={sortedWords}
          selectedIdx={selectedIdx}
          search={search}
          onSearchChange={setSearch}
          onSelectWord={setSelectedIdx}
        />
        {sortedWords.length > 0 && (
          <WordCard word={selectedWord} onEdit={startEdit} />
        )}
        <WordForm onSubmit={isEditing ? handleEditWord : handleAddWord} initialValues={editForm} isEditing={isEditing} cancelEdit={cancelEdit} />
      </div>
    </div>
  );
};

export default WordPage; 