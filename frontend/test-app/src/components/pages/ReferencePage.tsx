import React, { useState, useEffect } from 'react';
import ReferenceForm from '../atoms/Form/ReferenceForm';
import ReferenceCard from '../atoms/Card/ReferenceCard';
import ReferenceList from '../atoms/List/ReferenceList';
import { DefaultReference, type Reference } from '../../model/library';
import api from '../../api';

const ReferencePage: React.FC = () => {
  const [isLoadingReferences, setIsLoadingReferences] = useState<boolean>(true);
  const [references, setReferences] = useState<Reference[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Reference>(DefaultReference);

  const filteredReferences = references.filter((r: Reference) =>
    r.value.toLowerCase().includes(search.toLowerCase()) ||
    r.tags.split(',').some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedReferences = [...filteredReferences].sort((a, b) => a.value.localeCompare(b.value));
  const selectedReference = sortedReferences[selectedIdx] || sortedReferences[0];

  useEffect(() => {
    if (sortedReferences.length === 0) return;
    if (!sortedReferences[selectedIdx]) setSelectedIdx(0);
  }, [search, sortedReferences.length, sortedReferences, selectedIdx]);

  const loadReferenceRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=references')
      .then(response => setReferences(JSON.parse(response.data.records)))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingReferences(false) });
  }

  useEffect(() => {
    if (isLoadingReferences) {
      loadReferenceRecords();
    }
  }, [isLoadingReferences]);

  const handleSubmit = (references: Reference[]) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'references',
      records: JSON.stringify(references)
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleAddReference = (form: Reference) => {
    const newReference = {
      id: String(references.length + 1),
      value: form.value,
      origin: form.origin,
      definition: form.definition,
      tags: form.tags,
    };
    setReferences(prev => {
      const updatedReferences = [newReference, ...prev];
      handleSubmit(updatedReferences);
      return updatedReferences;
    });
    setSearch('');
    setSelectedIdx(0);
  };

  const handleEditReference = (form: Reference) => {
    setReferences(prev => {
      const updatedReferences = prev.map((r) =>
        r.id === selectedReference.id
          ? {
            id: r.id,
            value: form.value,
            origin: form.origin,
            definition: form.definition,
            tags: form.tags,
          }
          : r
      ).filter((w) => w.value !== 'delete');
      handleSubmit(updatedReferences);
      return updatedReferences;
    });
    setIsEditing(false);
    setEditForm(DefaultReference);
  };

  const startEdit = () => {
    setEditForm({
      id: selectedReference.id,
      value: selectedReference.value,
      origin: selectedReference.origin,
      definition: selectedReference.definition,
      tags: selectedReference.tags,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(DefaultReference);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">References</h1>
      <div className="page-body-layout">
        <ReferenceList
          references={sortedReferences}
          selectedIdx={selectedIdx}
          search={search}
          onSearchChange={setSearch}
          onSelectReference={setSelectedIdx}
        />
        {sortedReferences.length > 0 && (
          <ReferenceCard reference={selectedReference} onEdit={startEdit} />
        )}
        <ReferenceForm onSubmit={isEditing ? handleEditReference : handleAddReference} initialValues={editForm} isEditing={isEditing} cancelEdit={cancelEdit} />
      </div>
    </div>
  );
};

export default ReferencePage; 