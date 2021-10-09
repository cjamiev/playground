import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Pagination from './Pagination';

const zeroItem = [];
const oneItem = ['one'];
const tenItem = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten'
];
const prev = 'Prev';
const next = 'Next';

const defaultProps = {
  content: zeroItem
};

describe('Pagination', () => {
  it('checks behavior empty', () => {
    simpleTestWrapper(Pagination, defaultProps);

    const prevBtn = screen.getByText(prev);
    const oneBtn = screen.getByText('1');
    const nextBtn = screen.getByText(next);

    expect(prevBtn).toBeInTheDocument();
    expect(oneBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
  });

  it('checks behavior one item', () => {
    simpleTestWrapper(Pagination, { content: oneItem});

    const prevBtn = screen.getByText(prev);
    const oneBtn = screen.getByText('1');
    const nextBtn = screen.getByText(next);
    const contentOne = screen.getByText('one');

    expect(prevBtn).toBeInTheDocument();
    expect(oneBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
    expect(contentOne).toBeInTheDocument();
  });

  it('checks behavior many items', () => {
    simpleTestWrapper(Pagination, { content: tenItem});

    // Test prev and next buttons
    const prevBtn = screen.getByText(prev);
    const nextBtn = screen.getByText(next);

    expect(screen.getByText('one')).toBeInTheDocument();
    fireEvent.click(nextBtn);
    expect(screen.getByText('two')).toBeInTheDocument();
    fireEvent.click(prevBtn);
    expect(screen.getByText('one')).toBeInTheDocument();

    // Test page buttons
    fireEvent.click(screen.getByText('3'));
    expect(screen.getByText('three')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    fireEvent.click(screen.getByText('5'));
    expect(screen.getByText('five')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });
});
