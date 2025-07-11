import React from 'react';
import { type Book } from '../../../model/library';

interface BookListProps {
  books: Book[];
  selectedIdx: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectBook: (idx: number) => void;
}

const BookList: React.FC<BookListProps> = ({
  books,
  selectedIdx,
  search,
  onSearchChange,
  onSelectBook,
}) => {
  return (
    <div className="list-section">
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="search-bar"
      />
      <ul className="list-wrapper">
        {books.map((book, idx) => (
          <li key={idx} className="list-item">
            <button
              className={`list-item-btn${selectedIdx === idx ? ' selected' : ''}`}
              onClick={() => onSelectBook(idx)}
            >
              {book.name}
            </button>
          </li>
        ))}
        {books.length === 0 && (
          <li className="no-items-msg">No books found.</li>
        )}
      </ul>
    </div>
  );
};

export default BookList; 