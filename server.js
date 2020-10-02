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

// Callback function for GET /all, returns projectData
function sendData(req,res) {
  res.send(projectData);
}

// Initialize all route with a callback function
app.get('/all', sendData);

// POST Route for adding data
function addData(req, res) {
      const data = req.body;
      console.log(`Request Body is: ${Object.values(data)}`);
      projectData["date"] = data.date;
      projectData["userResponse"] = data.feelings;
      projectData["temperature"] = data.temp;
      res.send(projectData);
      console.log(`Project Data is: ${Object.values(projectData)}`);
  }

app.post('/add', addData);
