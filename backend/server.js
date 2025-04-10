const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Setup Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.nmcrq0k.mongodb.net/Sec32?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// --- Mongoose Schemas & Models ---

// User Login Attempt Schema
const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
  attemptedAt: {
    type: Date,
    default: Date.now,
  },
});
const Login = mongoose.model('Login', loginSchema);

// Job Application Schema
const applicationSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: String,
  date: String,
  link: String,
});
const Application = mongoose.model('Application', applicationSchema);

// --- Routes ---

// Login Attempt (store to DB only)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const login = new Login({ email, password });
  await login.save();

  res.status(200).json({ message: 'Login attempt stored' });
});

// Get all applications
app.get('/api/applications', async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
});

// Add a new application
app.post('/api/applications', async (req, res) => {
  const newApp = new Application(req.body);
  const savedApp = await newApp.save();
  res.status(201).json(savedApp);
});

// Update an application
app.put('/api/applications/:id', async (req, res) => {
  const updatedApp = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedApp);
});

// Delete an application
app.delete('/api/applications/:id', async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: 'Application deleted successfully' });
});

// Root route
app.get('/', (req, res) => {
  res.send('Job Application Tracker Backend Running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
