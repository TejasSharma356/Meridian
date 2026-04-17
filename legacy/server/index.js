const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const supabase = require('./supabaseClient');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Basic status route
app.get('/api/status', (req, res) => {
  res.json({ status: 'nominal', message: 'Meridian Intelligence OS Backend is active.' });
});

// Mock Dashboard Stats (until tables are populated)
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    // In a real scenario, we would pull this from Supabase
    // const { data, error } = await supabase.from('stats').select('*').single();
    
    const mockStats = [
      { label: 'PROJECTS DEPLOYED', val: '4', status: '+1 THIS WEEK' },
      { label: 'MARKET MATCH SCORE', val: '86%', status: 'HIGH PROBABILITY' },
      { label: 'APPLICATIONS SENT', val: '12', status: '3 INTERVIEWS PENDING' },
      { label: 'SKILL COMPREHENSION', val: '92%', status: 'ADVANCING' }
    ];
    
    res.json(mockStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Auth Routes (Login)
app.post('/api/auth/login', async (req, res) => {
  const { accessCode } = req.body;
  
  // This is a placeholder for actual Supabase Auth logic
  if (accessCode === 'admin') {
     res.json({ message: 'Success', user: { email: 'admin@meridian.os' } });
  } else {
     res.status(401).json({ message: 'Invalid access code' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Meridian Server ignited on port ${PORT}`);
});
