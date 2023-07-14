const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authentication-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
app.use(express.json());

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    const accessToken = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1d' });

    res.json({ email: user.email, accessToken });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup error' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

//login

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      const accessToken = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1d' });
  
      res.json({ email: user.email, accessToken });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login error' });
    }
  });

  // index.js

const { isAdmin } = require('./middleware');
const Question = require('./models/Question');

// API to add a question
app.post('/admin/questions', isAdmin, async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new question
    const question = new Question({
      title,
      description,
      // ... other fields related to the question
    });

    // Save the question to the database
    await question.save();

    res.status(201).json(question);
  } catch (error) {
    console.error('Add question error:', error);
    res.status(500).json({ message: 'Add question error' });
  }
});

// API to edit a question
app.put('/admin/questions/:questionId', isAdmin, async (req, res) => {
  try {
    const { questionId } = req.params;
    const { title, description } = req.body;

    // Find the question by its ID and update the fields
    const question = await Question.findByIdAndUpdate(questionId, {
      title,
      description,
      // ... other fields related to the question
    });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    console.error('Edit question error:', error);
    res.status(500).json({ message: 'Edit question error' });
  }
});

// API to delete a question
app.delete('/admin/questions/:questionId', isAdmin, async (req, res) => {
  try {
    const { questionId } = req.params;

    // Find the question by its ID and delete it
    const question = await Question.findByIdAndDelete(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Delete question error:', error);
    res.status(500).json({ message: 'Delete question error' });
  }
});

// index.js

app.post('/admin/questions/:questionId/testcases', isAdmin, async (req, res) => {
    try {
      const { questionId } = req.params;
      const { input, output } = req.body;
  
      // Find the question by its ID
      const question = await Question.findById(questionId);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      // Add the test case to the question's test cases array
      question.testCases.push({ input, output });
  
      // Save the updated question to the database
      await question.save();
  
      res.status(201).json(question);
    } catch (error) {
      console.error('Add test case error:', error);
      res.status(500).json({ message: 'Add test case error' });
    }
  });

  // index.js

app.post('/questions/:questionId/solution', async (req, res) => {
    try {
      const { questionId } = req.params;
      const { solution } = req.body;
  
      // Find the question by its ID
      const question = await Question.findById(questionId);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      // Perform the solution check using the Sphere Engine API
      // ...
  
      // Simulate a response (replace this with the actual implementation)
      const isCorrect = Math.random() < 0.5; // Randomly determine if the solution is correct
      const response = isCorrect ? 'success' : 'wrong';
      const error = isCorrect ? null : 'Syntax error';
  
      res.json({ response, error });
    } catch (error) {
      console.error('Solution check error:', error);
      res.status(500).json({ message: 'Solution check error' });
    }
  });
  
  

