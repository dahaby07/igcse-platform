import React, { useEffect, useState } from 'react';
import './HomePage.css';

const API_BASE = 'http://localhost:3001/api';

function HomePage() {
  const [stats, setStats] = useState({ totalTopics: 0, totalQuestions: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        setError('');
        const response = await fetch(`${API_BASE}/stats`);
        if (!response.ok) {
          throw new Error('Failed to fetch statistics.');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadStats();
  }, []);

  return (
    <section className="home-page">
      <h1>IGCSE Chemistry Exam Platform</h1>
      <p className="home-page__subtitle">Practice by topic, review mark schemes, and track your question bank.</p>

      {error ? <p className="home-page__error">{error}</p> : null}

      <div className="home-page__stats">
        <article>
          <h3>{stats.totalTopics}</h3>
          <p>Total Topics</p>
        </article>
        <article>
          <h3>{stats.totalQuestions}</h3>
          <p>Total Questions</p>
        </article>
      </div>
    </section>
  );
}

export default HomePage;
