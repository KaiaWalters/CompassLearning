/* eslint-env node */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import learningPlanRoutes from './routes/learningPlan.js';
import aiRoutes from './routes/ai.js';

// Load environment variables
dotenv.config();

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// API routes
app.use('/api/learning-plan', learningPlanRoutes);
app.use('/api/ai', aiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;

