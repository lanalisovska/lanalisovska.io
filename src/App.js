import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import AnotherPage from './pages/AnotherPage';
import Sidebar from './components/Sidebar';
import './App.css';
import UserPage from './pages/UserPage';
import Header from './components/Header/Header';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className="main-content">
          <Header />
          <div className='content'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/another" element={<AnotherPage />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
