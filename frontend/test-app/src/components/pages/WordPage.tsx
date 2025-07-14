import React, { useState, useEffect } from 'react';
import { loadRecordsByType, updateRecordsByType } from '../../api/library-service';
import Banner from '../atoms/Banner';
import AddCard from '../atoms/AddCard';
import Search from '../atoms/Search';
import Modal from '../atoms/Modal';
import Sidepanel from '../atoms/Sidepanel';
import Footer from '../atoms/Footer';
import Pagination from '../atoms/Pagination';
import WordCard from '../atoms/Word/WordCard';
import WordForm from '../atoms/Word/WordForm';
import { DefaultWord, type Word, WORD_TYPE } from '../../model/library';
import { fakeWords } from '../../mocked/words';
import { copyContents } from '../../utils/copyToClipboard';
import { getCSV, getJSON } from '../../utils/contentMapper';
import { useStorage } from '../../context/StorageContext';
import { getRecordsFromStorage } from '../../utils/storage';

const WORDS_PER_PAGE = 24;
const wordSearchByOptions = [
  { value: 'value', label: 'Word' },
  { value: 'tags', label: 'Tags' }
];
const wordSortByOptions: { value: string; label: string }[] = [];

const WordPage: React.FC = () => {
  const { isBackendAvailable, isLoadingPing } = useStorage();
  const [isLoadingWords, setIsLoadingWords] = useState<boolean>(true);
  const [words, setWords] = useState<Word[]>([]);

  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('value');
  const [sortBy, setSortBy] = useState<string>('value');

  const [editForm, setEditForm] = useState<Word>(DefaultWord);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [wordToDelete, setWordToDelete] = useState<Word | null>(null);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [showJSONModal, setShowJSONModal] = useState(false);
  const [showBanner, setShowBanner] = useState<{ show: boolean; type: string }>({ show: false, type: 'success' });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredWords = words.filter((w: Word) => {
    if (searchBy === 'tags') {
      return w.tags.split(',').some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    } else if (searchBy === 'type') {
      return WORD_TYPE[w.type].toLowerCase().includes(search.toLowerCase());
    } else {
      return w.value.toLowerCase().includes(search.toLowerCase());
    }
  });

  const sortedWords = [...filteredWords].sort((a, b) => {
    if (sortBy === 'value') {
      return a.value.localeCompare(b.value);
    } else {
      return a.type - b.type;
    }
  });
  const totalPages = Math.ceil(sortedWords.length / WORDS_PER_PAGE);
  const paginatedWords = sortedWords.slice((currentPage - 1) * WORDS_PER_PAGE, currentPage * WORDS_PER_PAGE);

  const allTags = Array.from(
    new Set(
      words.flatMap((word) =>
        word.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean)
      )
    )
  ).sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    if (isBackendAvailable && isLoadingWords) {
      loadRecordsByType('words').then((records: Word[]) => {
        setWords(records);
        setIsLoadingWords(false);
      });
    }
    if (!isBackendAvailable && !isLoadingPing) {
      const savedWords = getRecordsFromStorage('words', [...fakeWords]);
      setWords(savedWords);
      setIsLoadingWords(false);
    }
  }, [isBackendAvailable, isLoadingPing, isLoadingWords]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, searchBy, sortBy, words.length]);

  const handleSubmit = async (payload: Word[]) => {
    if (!isBackendAvailable && !isLoadingPing) {
      localStorage.setItem('words', JSON.stringify(payload));
    } else {
      updateRecordsByType(JSON.stringify(payload), 'words')
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

  const handleAddWord = (form: Word) => {
    const newWord = {
      value: form.value,
      definition: form.definition,
      type: form.type,
      tags: form.tags
    };
    setWords((prev) => {
      const updatedWords = [newWord, ...prev];
      handleSubmit(updatedWords);
      return updatedWords;
    });
    setIsPanelOpen(false);
    setIsAddMode(false);
    setIsEditing(false);
    setEditForm(DefaultWord);
    setSearch('');
  };

  const handleEditWord = (form: Word) => {
    setWords((prev) => {
      const updatedWords = prev.map((w) =>
        w.value === form.value
          ? {
              value: form.value,
              definition: form.definition,
              type: form.type,
              tags: form.tags
            }
          : w
      );

      handleSubmit(updatedWords);
      return updatedWords;
    });
    setIsPanelOpen(false);
    setIsAddMode(false);
    setIsEditing(false);
    setEditForm(DefaultWord);
  };

  const startEdit = (selectedWord: Word, isClone?: boolean) => {
    setEditForm({
      value: selectedWord.value,
      definition: selectedWord.definition,
      type: selectedWord.type,
      tags: selectedWord.tags
    });
    setIsEditing(!isClone);
    setIsAddMode(Boolean(isClone));
    setIsPanelOpen(true);
  };

  const startAdd = () => {
    setEditForm(DefaultWord);
    setIsEditing(false);
    setIsAddMode(true);
    setIsPanelOpen(true);
  };

  const cancelEdit = () => {
    setIsPanelOpen(false);
    setIsAddMode(false);
    setIsEditing(false);
    setEditForm(DefaultWord);
  };

  const handleDeleteWord = (word: Word) => {
    setWordToDelete(word);
    setShowDeleteModal(true);
  };

  const confirmDeleteWord = () => {
    if (wordToDelete) {
      setWords((prev) => {
        const updatedWords = prev.filter((w) => w.value !== wordToDelete.value);
        handleSubmit(updatedWords);
        return updatedWords;
      });
      setShowDeleteModal(false);
      setWordToDelete(null);
    }
  };

  const cancelDeleteWord = () => {
    setShowDeleteModal(false);
    setWordToDelete(null);
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
      <h1 className="page-title">Words</h1>
      <Search
        search={search}
        onSearchChange={setSearch}
        searchBy={searchBy}
        handleChangeSearchBy={handleChangeSearchBy}
        sortBy={sortBy}
        handleChangeSortBy={handleChangeSortBy}
        searchByOptions={wordSearchByOptions}
        sortByOptions={wordSortByOptions}
      />
      <div className="page-body-layout">
        {!isLoadingWords ? (
          <div className="cards-container">
            {!search && currentPage === 1 ? <AddCard onClick={startAdd} /> : null}
            {paginatedWords.map((word, idx) => (
              <WordCard
                key={idx}
                word={word}
                onEdit={() => {
                  startEdit(word);
                }}
                onClone={() => {
                  startEdit(word, true);
                }}
                onDelete={() => handleDeleteWord(word)}
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
        onClose={cancelDeleteWord}
        title={wordToDelete ? `Are you sure you want to delete "${wordToDelete.value}"?` : 'Error missing word'}
      >
        <div className="modal-actions">
          <button className="form-submit" onClick={confirmDeleteWord}>
            Confirm
          </button>
          <button className="form-cancel-btn" onClick={cancelDeleteWord}>
            Cancel
          </button>
        </div>
      </Modal>
      <Modal isOpen={showCSVModal} onClose={handleCloseCSVModal} title="CSV Export">
        <div className="modal-data-display">
          <button onClick={() => copyContents(getCSV(words))} className="modal-copy-btn">
            Copy
          </button>
          <pre className="modal-data-content">{getCSV(words)}</pre>
        </div>
      </Modal>
      <Modal isOpen={showJSONModal} onClose={handleCloseJSONModal} title="JSON Export">
        <div className="modal-data-display">
          <button onClick={() => copyContents(getJSON(words))} className="modal-copy-btn">
            Copy
          </button>
          <pre className="modal-data-content">{getJSON(words)}</pre>
        </div>
      </Modal>
      <Sidepanel
        isOpen={isPanelOpen && (isAddMode || isEditing)}
        onClose={cancelEdit}
        title={isEditing ? 'Updating existing' : 'Add a New Word'}
      >
        <WordForm
          onSubmit={isEditing ? handleEditWord : handleAddWord}
          initialValues={editForm}
          isEditing={isEditing}
          cancelEdit={cancelEdit}
          allTags={allTags}
        />
      </Sidepanel>
    </div>
  );
};

export default WordPage;
