import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Download from './pages/Download';
import Statistics from './pages/Statistics';
import './App.css';
import './styles/styles.css';

function App() {
  return (
    <Router basename="/skempi-webserver">
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">SMAPIE</Link>
            <div className="nav-brand-subtitle">
              <span className="brand-letter">S</span>tructural and <span className="brand-letter">M</span>echanistic <span className="brand-letter">A</span>nnotations of <span className="brand-letter">P</span>rotein <span className="brand-letter">I</span>nteractions with <span className="brand-letter">E</span>xplainability
            </div>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/browse">Browse</Link></li>
            <li><Link to="/statistics">Statistics</Link></li>
            <li><Link to="/download">Download</Link></li>
            <li><Link to="/news">News</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/download" element={<Download />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/news" element={<div>News Page (Coming Soon)</div>} />
            <Route path="*" element={<div>404: Page Not Found</div>} />
          </Routes>
        </main>

        <footer className="footer">
          <p> 2025 Lehigh University Informatics Lab</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
