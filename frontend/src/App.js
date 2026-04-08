import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TopicsPage from './pages/TopicsPage';
import QuestionsPage from './pages/QuestionsPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
