import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import useFilter from './useFilter';

const TestComponent = ({data, dataKey, filter}) => {
  const filteredData = useFilter(data, dataKey, filter);

  return (<div>
    {
      filteredData.map(item => {
        return <span key={item.key} >{item.key}</span>;
      })
    }
  </div>);
};

describe('useFilter', () => {
  const data = [{ key: '111'}, { key: '211'}, { key: '221'}, { key: '222'}];

  it('Should filter data', () => {
    const dataKey = 'key';
    const filter = '222';
    act(() => {
      render(<TestComponent data={data} dataKey={dataKey} filter={filter} />);
    });

    expect(screen.getByText('222')).toBeInTheDocument();
    expect(screen.queryByText('221')).not.toBeInTheDocument();
  });

  it('Should not filter data', () => {
    const dataKey = 'key';
    const filter = '';
    act(() => {
      render(<TestComponent data={data} dataKey={dataKey} filter={filter} />);
    });

    expect(screen.getByText('111')).toBeInTheDocument();
    expect(screen.getByText('211')).toBeInTheDocument();
    expect(screen.getByText('221')).toBeInTheDocument();
    expect(screen.getByText('222')).toBeInTheDocument();
  });
});