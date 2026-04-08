import React, { useEffect, useMemo, useState } from 'react';
import QuestionCard from '../components/QuestionCard';
import './QuestionsPage.css';

const API_BASE = 'http://localhost:3001/api';

function QuestionsPage() {
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [yearFilter, setYearFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
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

        if (data.length) {
          setSelectedTopicId(String(data[0].id));
        }
      } catch (err) {
        setError(err.message);
      }
    };

    loadTopics();
  }, []);

  useEffect(() => {
    if (!selectedTopicId) {
      setQuestions([]);
      return;
    }

    const loadQuestions = async () => {
      try {
        setError('');
        const response = await fetch(`${API_BASE}/questions/${selectedTopicId}`);
        if (!response.ok) {
          throw new Error('Failed to load questions.');
        }

        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadQuestions();
  }, [selectedTopicId]);

  const years = useMemo(() => {
    const allYears = [...new Set(questions.map((question) => question.year))];
    return allYears.sort((a, b) => b - a);
  }, [questions]);

  const filteredQuestions = useMemo(
    () =>
      questions.filter((question) => {
        const matchesYear = yearFilter === 'All' || String(question.year) === yearFilter;
        const matchesDifficulty = difficultyFilter === 'All' || question.difficulty === difficultyFilter;
        return matchesYear && matchesDifficulty;
      }),
    [questions, yearFilter, difficultyFilter]
  );

  const selectedTopic = topics.find((topic) => String(topic.id) === selectedTopicId);

  return (
    <section className="questions-page">
      <h2>Questions by Topic</h2>

      <div className="questions-page__controls">
        <label>
          Topic
          <select value={selectedTopicId} onChange={(event) => setSelectedTopicId(event.target.value)}>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Year
          <select value={yearFilter} onChange={(event) => setYearFilter(event.target.value)}>
            <option value="All">All</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label>
          Difficulty
          <select value={difficultyFilter} onChange={(event) => setDifficultyFilter(event.target.value)}>
            <option value="All">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
      </div>

      {error ? <p className="questions-page__error">{error}</p> : null}

      {filteredQuestions.length === 0 ? (
        <p className="questions-page__empty">No questions match the selected filters.</p>
      ) : (
        <div className="questions-page__list">
          {filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} topicName={selectedTopic?.name || 'Unknown Topic'} />
          ))}
        </div>
      )}
    </section>
  );
}

export default QuestionsPage;
