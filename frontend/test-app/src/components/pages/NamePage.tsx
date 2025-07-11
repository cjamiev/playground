import React, { useState, useEffect, useMemo } from 'react';
import NameForm from '../atoms/Form/NameForm';
import NameCard from '../atoms/Card/NameCard';
import NameList from '../atoms/List/NameList';
import { DefaultName, type Name } from '../../model/library';
import api from '../../api';

const NamePage: React.FC = () => {
  const [isLoadingNames, setIsLoadingNames] = useState<boolean>(true);
  const [names, setNames] = useState<Name[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Name>(DefaultName);

  const filteredNames = names.filter(n =>
    n.value.toLowerCase().includes(search.toLowerCase())
  );
  const sortedNames = useMemo(() => { return [...filteredNames].sort((a, b) => a.value.localeCompare(b.value)) }, [filteredNames]);
  const selectedName = sortedNames[selectedIdx] || sortedNames[0];

  useEffect(() => {
    if (sortedNames.length === 0) return;
    if (!sortedNames[selectedIdx]) setSelectedIdx(0);
  }, [search, sortedNames.length, sortedNames, selectedIdx]);

  const loadNameRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=names')
      .then(response => setNames(JSON.parse(response.data.records)))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingNames(false) });
  }

  useEffect(() => {
    if (isLoadingNames) {
      loadNameRecords();
    }
  }, [isLoadingNames]);

  const handleSubmit = (names: Name[]) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'names',
      records: JSON.stringify(names)
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleAddName = (form: Name) => {
    const newName = {
      value: form.value,
      gender: form.gender,
      origin: form.origin,
    };
    setNames(prev => {
      const updatedNames = [newName, ...prev];
      handleSubmit(updatedNames);
      return updatedNames;
    });
    setSearch('');
    setSelectedIdx(0);
  };

  const handleEditName = (form: Name) => {
    setNames(prev => {
      const updatedNames = prev.map((n) =>
        n.value === selectedName.value
          ? {
            value: form.value,
            gender: form.gender,
            origin: form.origin,
          }
          : n
      ).filter((w) => w.value !== 'delete');
      handleSubmit(updatedNames);
      return updatedNames;
    });
    setIsEditing(false);
    setEditForm(DefaultName);
  };

  const startEdit = () => {
    setEditForm({
      value: selectedName.value,
      gender: selectedName.gender,
      origin: selectedName.origin,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(DefaultName);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Names</h1>
      <div className="page-body-layout">
        <NameList
          names={sortedNames}
          selectedIdx={selectedIdx}
          search={search}
          onSearchChange={setSearch}
          onSelectName={setSelectedIdx}
        />
        {sortedNames.length > 0 && (
          <NameCard name={selectedName} onEdit={startEdit} />
        )}
        <NameForm onSubmit={isEditing ? handleEditName : handleAddName} initialValues={editForm} isEditing={isEditing} cancelEdit={cancelEdit} />
      </div>
    </div>
  );
};

export default NamePage; 