import React, { useEffect, useState } from 'react';
import AddQuestionModal from '../components/AddQuestionModal';
import './AdminPage.css';

const API_BASE = 'http://localhost:3001/api';

function AdminPage() {
  const [topics, setTopics] = useState([]);
  const [stats, setStats] = useState({ totalTopics: 0, totalQuestions: 0 });
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [topicQuestions, setTopicQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadTopics = async () => {
    const response = await fetch(`${API_BASE}/topics`);
    if (!response.ok) {
      throw new Error('Failed to load topics.');
    }
    const data = await response.json();
    setTopics(data);
    if (data.length && !selectedTopicId) {
      setSelectedTopicId(String(data[0].id));
    }
  };

  const loadStats = async () => {
    const response = await fetch(`${API_BASE}/stats`);
    if (!response.ok) {
      throw new Error('Failed to load stats.');
    }
    const data = await response.json();
    setStats(data);
  };

  const loadQuestionsForTopic = async (topicId) => {
    if (!topicId) {
      setTopicQuestions([]);
      return;
    }

    const response = await fetch(`${API_BASE}/questions/${topicId}`);
    if (!response.ok) {
      throw new Error('Failed to load topic questions.');
    }
    const data = await response.json();
    setTopicQuestions(data);
  };

  useEffect(() => {
    const bootstrap = async () => {
      try {
        setError('');
        await Promise.all([loadTopics(), loadStats()]);
      } catch (err) {
        setError(err.message);
      }
    };

    bootstrap();
  }, []);

  useEffect(() => {
    const refreshSelectedTopic = async () => {
      try {
        setError('');
        await loadQuestionsForTopic(selectedTopicId);
      } catch (err) {
        setError(err.message);
      }
    };

    refreshSelectedTopic();
  }, [selectedTopicId]);

  const handleAddQuestion = async (formData) => {
    try {
      setError('');
      setSuccess('');
      const response = await fetch(`${API_BASE}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: Number(formData.topicId),
          year: Number(formData.year),
          difficulty: formData.difficulty,
          text: formData.text,
          marks: Number(formData.marks),
          markScheme: formData.markScheme
        })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Failed to add question.');
      }

      await Promise.all([loadStats(), loadQuestionsForTopic(String(payload.topicId))]);
      setSelectedTopicId(String(payload.topicId));
      setIsModalOpen(false);
      setSuccess('Question added successfully.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-page__header">
        <h2>Admin Panel</h2>
        <button className="admin-page__add-btn" onClick={() => setIsModalOpen(true)}>
          + Add Question
        </button>
      </div>

      {error ? <p className="admin-page__error">{error}</p> : null}
      {success ? <p className="admin-page__success">{success}</p> : null}

      <div className="admin-page__stats">
        <article>
          <h3>{stats.totalTopics}</h3>
          <p>Total Topics</p>
        </article>
        <article>
          <h3>{stats.totalQuestions}</h3>
          <p>Total Questions</p>
        </article>
      </div>

      <div className="admin-page__topic-filter">
        <label>
          View questions for topic
          <select value={selectedTopicId} onChange={(event) => setSelectedTopicId(event.target.value)}>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="admin-page__list">
        {topicQuestions.length === 0 ? (
          <p>No questions available for this topic.</p>
        ) : (
          topicQuestions.map((question) => (
            <article key={question.id} className="admin-page__question-item">
              <strong>#{question.id}</strong> {question.text}
              <span>
                {question.year} • {question.difficulty} • {question.marks} marks
              </span>
            </article>
          ))
        )}
      </div>

      <AddQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddQuestion}
        topics={topics}
      />
    </section>
  );
}

export default AdminPage;
