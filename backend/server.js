const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const dataFile = path.join(__dirname, 'data.json');

if (!fs.existsSync(dataFile)) {
    const initialData = {
        topics: [
            {id: 1, name: 'Atomic Structure'},
            {id: 2, name: 'Bonding'},
            {id: 3, name: 'Stoichiometry'},
            {id: 4, name: 'Energetics'},
            {id: 5, name: 'Kinetics'},
            {id: 6, name: 'Equilibrium'},
            {id: 7, name: 'Acids and Bases'},
            {id: 8, name: 'Redox Reactions'},
            {id: 9, name: 'Electrochemistry'},
            {id: 10, name: 'Organic Chemistry'},
            {id: 11, name: 'Polymers'},
            {id: 12, name: 'Groups in the Periodic Table'},
            {id: 13, name: 'Rates of Reaction'},
            {id: 14, name: 'Equilibrium Constant'}
        ],
        questions: []
    };
    fs.writeFileSync(dataFile, JSON.stringify(initialData, null, 2));
}

app.get('/api/topics', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    res.json(data.topics);
});

app.get('/api/questions/:topicId', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    const questions = data.questions.filter(q => q.topicId == req.params.topicId);
    res.json(questions);
});

app.get('/api/stats', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    res.json({ totalTopics: data.topics.length, totalQuestions: data.questions.length });
});

app.post('/api/questions', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    const newQuestion = { id: Math.max(...data.questions.map(q => q.id), 0) + 1, ...req.body };
    data.questions.push(newQuestion);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    res.json(newQuestion);
});

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));