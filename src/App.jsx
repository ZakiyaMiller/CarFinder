import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Navbar from './components/Navbar';
import './index.css';

const App = () => {
  const [mode, setMode] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const themeConfig = useMemo(() => theme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <ThemeProvider theme={themeConfig}>
      <CssBaseline />
      <Router>
        <Navbar onToggleTheme={toggleTheme} mode={mode} onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;