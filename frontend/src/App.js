import React from 'react';
import './styles/Homepagewosn.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePagewosn';
import LoginPage from './components/Login';
 
import RegisterPage from './components/Register';

// Import Post Management components
import PostList from './postManagement/PostList';
import PostCreateForm from './postManagement/PostCreateForm';
import PostEditForm from './postManagement/PostEditForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Post Management Routes */}
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/new" element={<PostCreateForm />} />
        <Route path="/posts/edit/:postId" element={<PostEditForm />} />
        
      </Routes>
    </Router>
  );
}

export default App;
