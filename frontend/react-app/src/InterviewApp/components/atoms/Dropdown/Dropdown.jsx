import { useRef, useState } from 'react';
import { useThemeContext } from '../../../context/ThemeProvider';
import {
  SCDropdown,
  SCDropdownBtn,
  SCDropdownContent,
} from './styles';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const Dropdown = ({ label, content }) => {
  const { isLightMode } = useThemeContext();
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setIsVisible(false));

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SCDropdown ref={dropdownRef} $islightmode={isLightMode}>
      <SCDropdownBtn onClick={toggle} $islightmode={isLightMode}>{label}</SCDropdownBtn>
      <SCDropdownContent onClick={toggle} $isvisible={isVisible} $islightmode={isLightMode}>{content}</SCDropdownContent>
    </SCDropdown>
  );
};

export default Dropdown;
