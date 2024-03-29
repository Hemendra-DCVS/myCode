const express = require('express');
const port = 8000;
const app = express();

// Import database configuration
const db = require('./config/mongoose');

// Import models
const Issue = require('./models/issue');
const Project = require('./models/project');

// Serve static files (CSS, JavaScript, etc.) from the 'assets' directory
app.use(express.static('./assets'));

// Set specific headers for JavaScript files
app.use('/assets', express.static('assets', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }
}));

// Parse incoming URL-encoded form data and populate the request body
app.use(express.urlencoded({ extended: true }));

// Import and use routes from the 'routes' module
app.use('/', require('./routes/home-router'));

// Set the view engine to use EJS (Embedded JavaScript)
app.set('view engine', 'ejs');

// Set the 'views' directory to look for EJS templates
app.set('views', './views');

// Start the server and listen on the defined port
app.listen(port, function(err) {
  if (err) {
    console.log('Error:', err);
  }
  console.log('Server is running on port:', port);
});
