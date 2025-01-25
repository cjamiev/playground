import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SCMultiDropdown,
  SCMultiDropdownBtnGroup,
  SCMultiDropdownBtn,
  SCMultiDropdownList,
  SCMultiDropdownListBtn
} from './styles';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const MultiDropdown = ({ data }) => {
  const ref = useRef();
  const [values, setValues] = useState([]);
  const [mode, setMode] = useState('');
  useOnClickOutside(ref, () => setMode(''));

  useEffect(() => {
    if (mode) {
      setValues(data.find((item) => item.label === mode).values);
    }
  }, [data, mode]);

  return (
    <SCMultiDropdown ref={ref}>
      <SCMultiDropdownBtnGroup>
        {data.map((item) => {
          return (
            <SCMultiDropdownBtn
              key={item.label}
              onClick={() => {
                setMode(item.label);
              }}
            >
              {item.label}
            </SCMultiDropdownBtn>
          );
        })}
      </SCMultiDropdownBtnGroup>
      <SCMultiDropdownList isVisible={mode !== ''}>
        {values.map((item) => {
          return (
            <SCMultiDropdownListBtn
              key={item}
              onClick={() => {
                console.log(`clicked ${item}`);
              }}
            >
              {item}
            </SCMultiDropdownListBtn>
          );
        })}
      </SCMultiDropdownList>
    </SCMultiDropdown>
  );
};

export default MultiDropdown;
