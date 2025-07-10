// server/index.js
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// Test route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from DALL.E!' });
});

const startServer = async () => {
  try {
    // Wait for DB connection before starting server
    await connectDB(process.env.MONGODB_URL);
    
    // Start listening
    app.listen(8080, () =>
      console.log('🚀 Server started on http://localhost:8080')
    );
  } catch (error) {
    console.error('❌ Server failed to start:', error);
  }
};

startServer();
