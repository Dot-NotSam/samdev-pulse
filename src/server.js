import express from 'express';
import profileRoute from './routes/profile.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/profile', profileRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
