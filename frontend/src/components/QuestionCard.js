import React from 'react';
import './QuestionCard.css';

function QuestionCard({ question, topicName }) {
  return (
    <article className="question-card">
      <div className="question-card__header">
        <span className="question-card__badge">{topicName}</span>
        <span className="question-card__meta">{question.year}</span>
        <span className="question-card__meta">{question.difficulty}</span>
        <span className="question-card__meta">{question.marks} marks</span>
      </div>
      <p className="question-card__text">{question.text}</p>
      <div className="question-card__scheme">
        <h4>Mark Scheme</h4>
        <p>{question.markScheme}</p>
      </div>
    </article>
  );
}

export default QuestionCard;
