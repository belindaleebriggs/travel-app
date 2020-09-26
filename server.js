// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;
const server = app.listen(port, listening);
function listening() {
  console.log('server running');
  console.log(`listening on localhost: ${port}`);
}
// Callback to debug
function debugGet(req, res) {
  res.send('hello I did a GET');
}
function debugPost(req, res) {
  res.send('hello I did a POST');
}
// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', debugGet);
// Post Route
app.post('/purple', debugPost);
