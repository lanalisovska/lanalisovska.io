import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarPage from './pages/CalendarPage';
import AnotherPage from './pages/AnotherPage';
import './App.css';
import UserPage from './pages/UserPage';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const routes = [
    { path: '/', element: <CalendarPage />},
    { path: '/homepage', element: <HomePage />},
    { path: '/inbox', element: <AnotherPage /> },
    { path: '/invoice', element: <AnotherPage /> },
    { path: '/user', element: <UserPage /> },
  ];

  return (
    <Router basename="lanalisovska.io">
      <div className="App">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className="main-content">
          <Header />
          <div className='content'>
            <Routes>
              {routes.map((route, index) => (
                <Route 
                  key={index} 
                  path={route.path} 
                  element={route.element} 
                />
              ))}
            </Routes>
          </div>
        </div>
      </div> 
    </Router>
  );
}

export default App;
