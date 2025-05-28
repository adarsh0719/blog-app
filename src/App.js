import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddBlogPage from './pages/AddBlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-blog" element={<AddBlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;