import React, { useEffect, useState } from 'react';
import './TopicsPage.css';

const API_BASE = 'http://localhost:3001/api';

function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTopics = async () => {
      try {
        setError('');
        const response = await fetch(`${API_BASE}/topics`);
        if (!response.ok) {
          throw new Error('Failed to load topics.');
        }
        const data = await response.json();
        setTopics(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadTopics();
  }, []);

  return (
    <section className="topics-page">
      <h2>Chemistry Topics</h2>
      {error ? <p className="topics-page__error">{error}</p> : null}
      <div className="topics-page__grid">
        {topics.map((topic) => (
          <article key={topic.id} className="topics-page__card">
            <span>Topic {topic.id}</span>
            <h3>{topic.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TopicsPage;
