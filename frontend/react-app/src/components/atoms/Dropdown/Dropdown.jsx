import { useRef, useState } from 'react';
import {
  SCDropdown,
  SCDropdownBtn,
  SCDropdownContent,
  SCDropdownHeader,
  SCDropdownBody,
  SCDropdownFooter
} from './styles';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const Dropdown = ({ label, header, body, footer }) => {
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setIsVisible(false));

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SCDropdown ref={dropdownRef}>
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
