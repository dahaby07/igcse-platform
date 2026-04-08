import React, { useEffect, useState } from 'react';
import './QuestionCard.css';

function QuestionCard({ question, topicName }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [showResult, setShowResult] = useState(false);

  const isMcq = Array.isArray(question.options) && question.options.length > 0 && typeof question.correctOption === 'string';

  useEffect(() => {
    setSelectedOption('');
    setShowResult(false);
  }, [question.id]);

  const isCorrect = selectedOption === question.correctOption;

  return (
    <article className="question-card">
      <div className="question-card__header">
        <span className="question-card__badge">{topicName}</span>
        <span className="question-card__meta">{question.year}</span>
        <span className="question-card__meta">{question.difficulty}</span>
        <span className="question-card__meta">{question.marks} marks</span>
      </div>

      <p className="question-card__text">{question.text}</p>

      {isMcq ? (
        <div className="question-card__mcq">
          <h4>Choose one answer</h4>
          <div className="question-card__options">
            {question.options.map((option) => (
              <label key={option.key} className="question-card__option">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.key}
                  checked={selectedOption === option.key}
                  onChange={() => setSelectedOption(option.key)}
                />
                <span>
                  <strong>{option.key}.</strong> {option.text}
                </span>
              </label>
            ))}
          </div>

          <div className="question-card__mcq-actions">
            <button
              type="button"
              className="question-card__check-btn"
              disabled={!selectedOption}
              onClick={() => setShowResult(true)}
            >
              Check Answer
            </button>
            {showResult ? (
              <p className={`question-card__result ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
                {isCorrect
                  ? 'Correct!'
                  : `Not quite. Correct answer: ${question.correctOption}.`}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="question-card__scheme">
        <h4>Mark Scheme</h4>
        <p>{question.markScheme}</p>
      </div>
    </article>
  );
}

export default QuestionCard;
