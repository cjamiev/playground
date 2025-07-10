import React, { useState, useEffect } from 'react';
import BookForm from '../atoms/BookForm';
import BookCard from '../atoms/BookCard';
import BookList from '../atoms/BookList';
import { DefaultBook, type Book } from '../../model/library';
import api from '../../api';

const BookPage: React.FC = () => {
  const [isLoadingBooks, setIsLoadingBooks] = useState<boolean>(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Book>(DefaultBook);

  const filteredBooks = books.filter((b: Book) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.tags.split(',').some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedBooks = [...filteredBooks];
  const selectedBook = sortedBooks[selectedIdx] || sortedBooks[0];

  useEffect(() => {
    if (sortedBooks.length === 0) return;
    if (!sortedBooks[selectedIdx]) setSelectedIdx(0);
  }, [search, sortedBooks.length, sortedBooks, selectedIdx]);

  const loadBookRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=books')
      .then(response => setBooks(JSON.parse(response.data.records)))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingBooks(false) });
  }

  useEffect(() => {
    if (isLoadingBooks) {
      loadBookRecords();
    }
  }, [isLoadingBooks]);

  const handleSubmit = (books: Book[]) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'books',
      records: JSON.stringify(books)
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleAddBook = (form: Book) => {
    const newBook = {
      name: form.name,
      isComic: form.isComic,
      tags: form.tags,
    };
    setBooks(prev => {
      const updatedBooks = [newBook, ...prev];
      handleSubmit(updatedBooks);
      return updatedBooks;
    });
    setSearch('');
    setSelectedIdx(0);
  };

  const handleEditBook = (form: Book) => {
    setBooks(prev => {
      const updatedBooks = prev.map((b) =>
        b.name === selectedBook.name
          ? {
            name: form.name,
            isComic: form.isComic,
            tags: form.tags,
          }
          : b
      ).filter((w) => w.name !== 'delete');
      handleSubmit(updatedBooks);
      return updatedBooks;
    });
    setIsEditing(false);
    setEditForm(DefaultBook);
  };

  const startEdit = () => {
    setEditForm({
      name: selectedBook.name,
      isComic: selectedBook.isComic,
      tags: selectedBook.tags,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(DefaultBook);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Books</h1>
      <div className="page-body-layout">
        <BookList
          books={sortedBooks}
          selectedIdx={selectedIdx}
          search={search}
          onSearchChange={setSearch}
          onSelectBook={setSelectedIdx}
        />
        {sortedBooks.length > 0 && (
          <BookCard book={selectedBook} onEdit={startEdit} />
        )}
        <BookForm onSubmit={isEditing ? handleEditBook : handleAddBook} initialValues={editForm} isEditing={isEditing} cancelEdit={cancelEdit} />
      </div>
    </div>
  );
};

export default BookPage; 