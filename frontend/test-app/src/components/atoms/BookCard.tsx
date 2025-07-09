import React from 'react';
import { type Book } from '../../model/library';

interface BookCardProps {
  book: Book;
  onEdit: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit }) => {
  return (
    <div className='card-wrapper'>
      <>
        <div className="card-title-wrapper">
          <h2 className="card-title">{book.name}</h2>
        </div>
        <div>
          <span className="card-label">Is Comic:</span> <span className="card-text">{book.isComic ? 'Yes' : 'No'}</span>
        </div>
        <div className="item-tags-row">
          <span className="card-label">Tags:</span> {book.tags.split(",").map((tag, i) => (
            <span key={i} className="item-tag">{tag}</span>
          ))}
        </div>
        <div className="card-footer">
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(book.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-google-link"
          >
            Google Book
          </a>
          <button
            onClick={onEdit}
            className="card-edit-btn"
          >
            Edit
          </button>
        </div>
      </>
    </div>
  );
};

export default BookCard; 