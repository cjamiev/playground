import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SCQuickAccess,
  SCQuickAccessBtnGroup,
  SCQuickAccessBtn,
  SCQuickAccessList,
  SCQuickAccessListBtn
} from './styles';
import useOnClickOutside from 'hooks/useOnClickOutside';

const PageQuickAccess = () => {
  const ref = useRef();
  const [mode, setMode] = useState('');
  useOnClickOutside(ref, () => setMode(''));

  return (
    <SCQuickAccess ref={ref}>
      <SCQuickAccessBtnGroup>
        <SCQuickAccessBtn
          onClick={() => {
            setMode('A');
          }}
        >
          A
        </SCQuickAccessBtn>
        <SCQuickAccessBtn
          onClick={() => {
            setMode('B');
          }}
        >
          B
        </SCQuickAccessBtn>
        <SCQuickAccessBtn
          onClick={() => {
            setMode('C');
          }}
        >
          C
        </SCQuickAccessBtn>
      </SCQuickAccessBtnGroup>
      <SCQuickAccessList isVisible={mode !== ''}>
        <SCQuickAccessListBtn
          key={'Test'}
          onClick={() => {
            console.log('clicked quick access');
          }}
        >
          Test
        </SCQuickAccessListBtn>
      </SCQuickAccessList>
    </SCQuickAccess>
  );
};

export default PageQuickAccess;
