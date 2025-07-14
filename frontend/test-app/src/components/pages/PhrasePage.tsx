import React, { useState, useEffect } from 'react';
import { loadRecordsByType, updateRecordsByType } from '../../api/library-service';
import Banner from '../atoms/Banner';
import AddCard from '../atoms/AddCard';
import Search from '../atoms/Search';
import Modal from '../atoms/Modal';
import Sidepanel from '../atoms/Sidepanel';
import Footer from '../atoms/Footer';
import Pagination from '../atoms/Pagination';
import PhraseCard from '../atoms/Phrase/PhraseCard';
import PhraseForm from '../atoms/Phrase/PhraseForm';
import { DefaultPhrase, type Phrase } from '../../model/library';
import { fakePhrases } from '../../mocked/phrases';
import { copyContents } from '../../utils/copyToClipboard';
import { getCSV, getJSON } from '../../utils/contentMapper';
import { useStorage } from '../../context/StorageContext';
import { getRecordsFromStorage } from '../../utils/storage';

const PHRASES_PER_PAGE = 24;
const phraseSearchByOptions = [
  { value: 'value', label: 'Phrase' },
  { value: 'origin', label: 'Origin' },
  { value: 'tags', label: 'Tags' }
];
const phraseSortByOptions: { value: string; label: string }[] = [];

const PhrasePage: React.FC = () => {
  const { isBackendAvailable, isLoadingPing } = useStorage();
  const [isLoadingPhrases, setIsLoadingPhrases] = useState<boolean>(true);
  const [phrases, setPhrases] = useState<Phrase[]>([]);

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('value');
  const [sortBy, setSortBy] = useState<string>('value');

  const [editForm, setEditForm] = useState<Phrase>(DefaultPhrase);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [phraseToDelete, setPhraseToDelete] = useState<Phrase | null>(null);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [showBanner, setShowBanner] = useState<{ show: boolean; type: string }>({ show: false, type: 'success' });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPhrases = phrases.filter((p: Phrase) => {
    if (searchBy === 'origin') {
      return p.origin.toLowerCase().includes(search.toLowerCase());
    } else if (searchBy === 'tags') {
      return p.tags.split(',').some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    } else {
      return p.value.toLowerCase().includes(search.toLowerCase());
    }
  });

  const sortedPhrases = [...filteredPhrases].sort((a, b) => {
    return a.value.localeCompare(b.value);
  });
  const totalPages = Math.ceil(sortedPhrases.length / PHRASES_PER_PAGE);
  const paginatedPhrases = sortedPhrases.slice((currentPage - 1) * PHRASES_PER_PAGE, currentPage * PHRASES_PER_PAGE);

  const allTags = Array.from(
    new Set(
      phrases.flatMap((phrase) =>
        phrase.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      )
    )
  ).sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    if (isBackendAvailable && isLoadingPhrases) {
      loadRecordsByType('phrases').then((records: Phrase[]) => {
        setPhrases(records);
        setIsLoadingPhrases(false);
      });
    }
    if (!isBackendAvailable && !isLoadingPing) {
      const savedPhrases = getRecordsFromStorage('phrases', [...fakePhrases]);
      setPhrases(savedPhrases);
      setIsLoadingPhrases(false);
    }
  }, [isBackendAvailable, isLoadingPing, isLoadingPhrases]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, searchBy, sortBy, phrases.length]);

  const handleSubmit = async (payload: Phrase[]) => {
    if (!isBackendAvailable && !isLoadingPing) {
      localStorage.setItem('phrases', JSON.stringify(payload));
    } else {
      updateRecordsByType(JSON.stringify(payload), 'phrases')
        .then((isSuccess: boolean) => {
          if (isSuccess) {
            setShowBanner({ show: true, type: 'success' });
            setTimeout(() => setShowBanner({ show: false, type: '' }), 2500);
          } else {
            setShowBanner({ show: true, type: 'error' });
            setTimeout(() => setShowBanner({ show: false, type: '' }), 2500);
          }
        })
        .catch((error: unknown) => {
          setShowBanner({ show: true, type: 'error' });
          setTimeout(() => setShowBanner({ show: false, type: '' }), 2500);
          console.error('Error:', error);
        });
    }
  };

  const handleAddPhrase = (form: Phrase) => {
    const newPhrase = {
      id: String(phrases.length + 1),
      value: form.value,
      origin: form.origin,
      tags: form.tags
    };
    setPhrases((prev) => {
      const updatedPhrases = [newPhrase, ...prev];
      handleSubmit(updatedPhrases);
      return updatedPhrases;
    });
    setIsPanelOpen(false);
    setIsAddMode(false);
    setIsEditing(false);
    setEditForm(DefaultPhrase);
    setSearch('');
  };

  const handleEditPhrase = (form: Phrase) => {
    setPhrases((prev) => {
      const updatedPhrases = prev.map((p) =>
        p.id === form.id
          ? {
              id: p.id,
              value: form.value,
              origin: form.origin,
              tags: form.tags
            }
          : p
      );

      handleSubmit(updatedPhrases);
      return updatedPhrases;
    });
    setIsPanelOpen(false);
    setIsAddMode(false);
    setIsEditing(false);
    setEditForm(DefaultPhrase);
  };

  const startEdit = (selectedPhrase: Phrase, isClone?: boolean) => {
    setEditForm({
      id: isClone ? String(phrases.length + 1) : selectedPhrase.id,
      value: selectedPhrase.value,
      origin: selectedPhrase.origin,
      tags: selectedPhrase.tags
    });
    setIsEditing(!isClone);
    setIsAddMode(Boolean(isClone));
    setIsPanelOpen(true);
  };

  const startAdd = () => {
    setEditForm(DefaultPhrase);
    setIsEditing(false);
    setIsAddMode(true);
    setIsPanelOpen(true);
  };

  const cancelEdit = () => {
    setIsPanelOpen(false);
    setIsAddMode(false);
    setIsEditing(false);
    setEditForm(DefaultPhrase);
  };

  const handleDeletePhrase = (phrase: Phrase) => {
    setPhraseToDelete(phrase);
    setShowDeleteModal(true);
  };

  const confirmDeletePhrase = () => {
    if (phraseToDelete) {
      setPhrases((prev) => {
        const updatedPhrases = prev.filter((p) => p.id !== phraseToDelete.id);
        handleSubmit(updatedPhrases);
        return updatedPhrases;
      });
      setShowDeleteModal(false);
      setPhraseToDelete(null);
    }
  };

  const cancelDeletePhrase = () => {
    setShowDeleteModal(false);
    setPhraseToDelete(null);
  };

  const handleClickTag = (tag: string) => {
    setSearchBy('tags');
    setSearch(tag);
  };

  const handleChangeSearchBy = (filter: string) => {
    setSearchBy(filter);
  };

  const handleChangeSortBy = (val: string) => setSortBy(val);

  const handleOpenCSVModal = () => setShowCSVModal(true);
  const handleCloseCSVModal = () => setShowCSVModal(false);
  const handleOpenJSONModal = () => setShowJSONModal(true);
  const handleCloseJSONModal = () => setShowJSONModal(false);

  const handlePrevious = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
  };
  const handlePageSelect = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };
  const handleNext = () => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  };

  return (
    <div className="page-wrapper">
      <Banner isVisible={showBanner.show} type={showBanner.type} />
      <h1 className="page-title">Phrases</h1>
      <Search
        search={search}
        onSearchChange={setSearch}
        searchBy={searchBy}
        handleChangeSearchBy={handleChangeSearchBy}
        sortBy={sortBy}
        handleChangeSortBy={handleChangeSortBy}
        searchByOptions={phraseSearchByOptions}
        sortByOptions={phraseSortByOptions}
      />
      <div className="page-body-layout">
        {!isLoadingPhrases ? (
          <div className="cards-container">
            {!search && currentPage === 1 ? <AddCard onClick={startAdd} /> : null}
            {paginatedPhrases.map((phrase, idx) => (
              <PhraseCard
                key={idx}
                phrase={phrase}
                onEdit={() => {
                  startEdit(phrase);
                }}
                onClone={() => {
                  startEdit(phrase, true);
                }}
                onDelete={() => handleDeletePhrase(phrase)}
                onHandleClickTag={handleClickTag}
              />
            ))}
          </div>
        ) : (
          <div className="loading-container">Loading...</div>
        )}
      </div>
      <Footer>
        <div>
          <button className="primary-btn" onClick={handleOpenCSVModal}>
            Show CSV
          </button>
          <button className="primary-btn" onClick={handleOpenJSONModal}>
            Show JSON
          </button>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePrevious={handlePrevious}
          handlePageSelect={handlePageSelect}
          handleNext={handleNext}
        />
      </Footer>
      <Modal
        isOpen={showDeleteModal}
        onClose={cancelDeletePhrase}
        title={phraseToDelete ? `Are you sure you want to delete "${phraseToDelete.value}"?` : 'Error missing phrase'}
      >
        <div className="modal-actions">
          <button className="form-submit" onClick={confirmDeletePhrase}>
            Confirm
          </button>
          <button className="form-cancel-btn" onClick={cancelDeletePhrase}>
            Cancel
          </button>
        </div>
      </Modal>
      <Modal isOpen={showCSVModal} onClose={handleCloseCSVModal} title="CSV Export">
        <div className="modal-data-display">
          <button onClick={() => copyContents(getCSV(phrases))} className="modal-copy-btn">
            Copy
          </button>
          <pre className="modal-data-content">{getCSV(phrases)}</pre>
        </div>
      </Modal>
      <Modal isOpen={showJSONModal} onClose={handleCloseJSONModal} title="JSON Export">
        <div className="modal-data-display">
          <button onClick={() => copyContents(getJSON(phrases))} className="modal-copy-btn">
            Copy
          </button>
          <pre className="modal-data-content">{getJSON(phrases)}</pre>
        </div>
      </Modal>
      <Sidepanel
        isOpen={isPanelOpen && (isAddMode || isEditing)}
        onClose={cancelEdit}
        title={isEditing ? 'Updating existing' : 'Add a New Phrase'}
      >
        <PhraseForm
          onSubmit={isEditing ? handleEditPhrase : handleAddPhrase}
          initialValues={editForm}
          isEditing={isEditing}
          cancelEdit={cancelEdit}
          allTags={allTags}
        />
      </Sidepanel>
    </div>
  );
};

export default PhrasePage;
