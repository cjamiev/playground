import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from "./context/ThemeProvider";
import { store } from './store';
import AppRouter from './components/router';
import './assets/main.css';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </HashRouter>
    </Provider>
  );
}

export default App;
