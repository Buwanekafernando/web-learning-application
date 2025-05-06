import React from 'react';
import './styles/Homepagewosn.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePagewosn'; 
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import Home from './components/Home'; 
import FileSharing from './components/FileSharing'; 
import ChatBox from './components/ChatBox';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/filesharing" element={<FileSharing />} />
        <Route path="/chatbox" element={<ChatBox />} />

      </Routes>
    </Router>
  );
}

export default App;
