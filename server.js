// Setup empty JS object to act as endpoint for all routes
projectData = {}; // may need to set to an array
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

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function for GET /all, returns projectData
function sendData(req,res) {
  req.send(projectData);
  projectData = {};  // may need to set to an array
}

// POST Route for adding data
app.post('/add', addData);

function addData(req, res) {
  newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    feelings: req.body.feelings,
  }
  projectData.push(newEntry);
  // res.send(projectData);
  console.log(projectData);
}
