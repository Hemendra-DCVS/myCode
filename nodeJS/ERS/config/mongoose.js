const mongoose = require('mongoose');
require('dotenv').config();


// Get the database connection URL from the environment variables (loaded from .env)
const dbConnectionUrl = process.env.DB_CONNECTION_URL;

// Connect to the MongoDB database
mongoose.connect(dbConnectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

// Get the default connection
const db = mongoose.connection;

// Event handlers for database connection
db.on('error', (error) => {
  console.error(`MongoDB connection error: ${error}`);
});

db.once('open', () => {
  console.log('Connected to MongoDB database');
});
