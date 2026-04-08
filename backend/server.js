const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_PATH = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

function readData() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

function parseInteger(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

app.get('/api/topics', (_req, res) => {
  const data = readData();
  res.json(data.topics);
});

app.get('/api/questions/:topicId', (req, res) => {
  const topicId = parseInteger(req.params.topicId);

  if (topicId === null) {
    return res.status(400).json({ error: 'Invalid topicId.' });
  }

  const data = readData();
  const questions = data.questions.filter((question) => question.topicId === topicId);
  return res.json(questions);
});

app.get('/api/stats', (_req, res) => {
  const data = readData();
  res.json({
    totalTopics: data.topics.length,
    totalQuestions: data.questions.length
  });
});

app.post('/api/questions', (req, res) => {
  const { topicId, year, difficulty, text, marks, markScheme } = req.body;

  const normalizedTopicId = parseInteger(topicId);
  const normalizedYear = parseInteger(year);
  const normalizedMarks = parseInteger(marks);

  if (
    normalizedTopicId === null ||
    normalizedYear === null ||
    normalizedMarks === null ||
    typeof difficulty !== 'string' ||
    typeof text !== 'string' ||
    typeof markScheme !== 'string' ||
    !difficulty.trim() ||
    !text.trim() ||
    !markScheme.trim()
  ) {
    return res.status(400).json({
      error: 'Invalid payload. Required fields: topicId, year, difficulty, text, marks, markScheme.'
    });
  }

  const data = readData();
  const topicExists = data.topics.some((topic) => topic.id === normalizedTopicId);

  if (!topicExists) {
    return res.status(404).json({ error: 'Topic not found.' });
  }

  const maxId = data.questions.reduce((currentMax, question) => Math.max(currentMax, question.id), 0);

  const newQuestion = {
    id: maxId + 1,
    topicId: normalizedTopicId,
    year: normalizedYear,
    difficulty: difficulty.trim(),
    text: text.trim(),
    marks: normalizedMarks,
    markScheme: markScheme.trim()
  };

  data.questions.push(newQuestion);
  writeData(data);

  return res.status(201).json(newQuestion);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
