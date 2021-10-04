import React, { useState } from 'react';

const ZERO = 0;
const ONE = 1;
const THREE = 3;

const Pagination = ({content}) => {
  const [pageNumber, setPageNumber] = useState(ZERO);
  const currentItem = content[pageNumber];
  const size = content.length;

  const prevBtn = () => {
    const isEnabled = pageNumber > ZERO;

    return <button disabled={!isEnabled} onClick={() => {setPageNumber(pageNumber-ONE);}}>Previous</button>;
  };

  const previousLength = pageNumber - THREE < ZERO ? pageNumber : THREE;
  const renderPreviousPageBtns = previousLength > ZERO ? Array.from({length: previousLength }).map((_, index) => {
    return <button key={index} onClick={() => {setPageNumber(pageNumber - previousLength + index);}}>{pageNumber - previousLength + index + ONE}</button>;
  }):[];

  const nextLength = pageNumber + THREE > size ? size - pageNumber : THREE;
  const renderNextPageBtns = nextLength > ZERO ? Array.from({length: nextLength }).map((_, index) => {
    return <button key={index} onClick={() => {setPageNumber(pageNumber + index);}}>{pageNumber + index + ONE}</button>;
  }):[];

  const nextBtn = () => {
    const isEnabled = pageNumber + ONE < size;

    return <button disabled={!isEnabled} onClick={() => {setPageNumber(pageNumber+ONE);}}>Next</button>;
  };

  return <div>
    {currentItem}
    {[prevBtn(),renderPreviousPageBtns,renderNextPageBtns, nextBtn()]}
  </div>;
};

export default Pagination;