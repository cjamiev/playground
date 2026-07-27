import { useContext, useEffect, createContext, useState } from "react";
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext({});

const useThemeContext = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("Attempting to create theme context");
  }
  return ctx;
};

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useLocalStorage('mode', 'true', false)
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    if(mode === 'true') {
      setIsLightMode(true);
    } else {
      setIsLightMode(false);
    }
  }, [mode])

  const switchMode = () => {
    setIsLightMode(!isLightMode);
    setMode(isLightMode ? 'false' : 'true');
  };

  return (
    <ThemeContext.Provider value={{ isLightMode, switchMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useThemeContext };
