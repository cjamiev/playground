import React, { useState } from 'react';

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;

const Pagination = ({ content }) => {
  const [pageNumber, setPageNumber] = useState(ZERO);
  const currentItem = content[pageNumber];
  const size = content.length;

  const prevBtn = () => {
    const isEnabled = pageNumber > ZERO;

    return (
      <button
        key="previous"
        disabled={!isEnabled}
        onClick={() => {
          setPageNumber(pageNumber - ONE);
        }}
      >
        Previous
      </button>
    );
  };

  const renderPreviousPageBtns = Array.from({ length: THREE })
    .map((_, index) => {
      return pageNumber - index;
    })
    .reverse()
    .filter((item) => item > ZERO)
    .map((num) => {
      return (
        <button
          key={num}
          onClick={() => {
            setPageNumber(num - ONE);
          }}
        >
          {num}
        </button>
      );
    });

  const currentBtn = () => {
    return (
      <button
        key="current"
        disabled
        onClick={() => {
          setPageNumber(pageNumber);
        }}
      >
        {pageNumber + ONE}
      </button>
    );
  };

  const renderNextPageBtns = Array.from({ length: THREE })
    .map((_, index) => {
      return pageNumber + index + TWO;
    })
    .filter((item) => item <= size)
    .map((num) => {
      return (
        <button
          key={num}
          onClick={() => {
            setPageNumber(num - ONE);
          }}
        >
          {num}
        </button>
      );
    });

  const nextBtn = () => {
    const isEnabled = pageNumber + ONE < size;

    return (
      <button
        key="next"
        disabled={!isEnabled}
        onClick={() => {
          setPageNumber(pageNumber + ONE);
        }}
      >
        Next
      </button>
    );
  };

  return (
    <div>
      {currentItem}
      {[prevBtn(), renderPreviousPageBtns, currentBtn(), renderNextPageBtns, nextBtn()]}
    </div>
  );
};

export default Pagination;
