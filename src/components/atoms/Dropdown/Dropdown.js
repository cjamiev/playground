import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SCDropdown,
  SCDropdownBtn,
  SCDropdownContent,
  SCDropdownHeader,
  SCDropdownBody,
  SCDropdownFooter
} from './styles';
import useOnClickOutside from 'hooks/useOnClickOutside';

const Dropdown = ({ label, header, body, footer }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);
  useOnClickOutside(ref, () => setIsVisible(false));

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SCDropdown ref={ref}>
      <SCDropdownBtn onClick={toggle}>{label}</SCDropdownBtn>
      <SCDropdownContent isVisible={isVisible}>
        <SCDropdownHeader>{header}</SCDropdownHeader>
        <SCDropdownBody>{body}</SCDropdownBody>
        <SCDropdownFooter>{footer}</SCDropdownFooter>
      </SCDropdownContent>
    </SCDropdown>
  );
};

export default Dropdown;
