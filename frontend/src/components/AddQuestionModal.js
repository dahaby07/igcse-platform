import React, { useState } from 'react';
import './AddQuestionModal.css';

const emptyForm = {
  topicId: '',
  year: '',
  difficulty: 'Medium',
  text: '',
  marks: '',
  markScheme: ''
};

function AddQuestionModal({ isOpen, onClose, onSubmit, topics }) {
  const [formData, setFormData] = useState(emptyForm);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(formData);
    setFormData(emptyForm);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <h3>Add New Question</h3>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Topic
            <select name="topicId" value={formData.topicId} onChange={handleChange} required>
              <option value="">Select a topic</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Year
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="2000"
              max="2100"
              required
            />
          </label>

          <label>
            Difficulty
            <select name="difficulty" value={formData.difficulty} onChange={handleChange} required>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>

          <label>
            Marks
            <input type="number" name="marks" value={formData.marks} onChange={handleChange} min="1" required />
          </label>

          <label>
            Question Text
            <textarea name="text" value={formData.text} onChange={handleChange} rows="4" required />
          </label>

          <label>
            Mark Scheme
            <textarea
              name="markScheme"
              value={formData.markScheme}
              onChange={handleChange}
              rows="4"
              required
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestionModal;
