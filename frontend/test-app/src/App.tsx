import WordPage from './components/pages/WordPage';
import ConstructedWordPage from './components/pages/ConstructedWordPage';
import NamePage from './components/pages/NamePage';
import ConstructedNamePage from './components/pages/ConstructedNamePage';
import PhrasePage from './components/pages/PhrasePage';
import ReferencePage from './components/pages/ReferencePage';
import SongPage from './components/pages/SongPage';
import FilmPage from './components/pages/FilmPage';
import GamePage from './components/pages/GamePage';
import ShowPage from './components/pages/ShowPage';
import BookPage from './components/pages/BookPage';
import HomePage from './components/pages/HomePage';
import FavoritePage from './components/pages/FavoritePage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav className="page-nav">
        <Link to="/">Home</Link>
        <Link to="/constructed-word">Constructed Word</Link>
        <Link to="/word">Word</Link>
        <Link to="/constructed-name">Constructed Name</Link>
        <Link to="/name">Name</Link>
        <Link to="/phrase">Phrase</Link>
        <Link to="/reference">Reference</Link>
        <Link to="/song">Song</Link>
        <Link to="/game">Game</Link>
        <Link to="/book">Book</Link>
        <Link to="/favorite">Favorite</Link>
        <Link to="/film">Film</Link>
        <Link to="/show">Show</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/constructed-word" element={<ConstructedWordPage />} />
        <Route path="/word" element={<WordPage />} />
        <Route path="/constructed-name" element={<ConstructedNamePage />} />
        <Route path="/name" element={<NamePage />} />
        <Route path="/phrase" element={<PhrasePage />} />
        <Route path="/reference" element={<ReferencePage />} />
        <Route path="/song" element={<SongPage />} />
        <Route path="/film" element={<FilmPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/show" element={<ShowPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/book" element={<BookPage />} />
      </Routes>
    </Router>
  );
}

export default App;
