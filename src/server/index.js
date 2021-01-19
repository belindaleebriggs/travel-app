// Setup empty JS object to act as endpoint for all routes
projectData = {}; // may need to set to an array

// Express to run server and routes
// Change when moving to environments (8080 dev, 8081 prod)
const port = 8080;

/* Express to run server and routes */
const express = require('express');
const app = express(); // start up an instance

/* Dependencies */
// Use env file for api key
const dotenv = require('dotenv');
dotenv.config();

// Tells what data type we mostly will work with
const bodyParser = require ('body-parser')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// let browser and server talk without any security interuptions
const cors = require('cors')
app.use(cors());

// lets server run fetch requests
const fetch = require('node-fetch');

/* Initialize main project folder */
app.use(express.static('dist'))

/* Create local server */
var path = require('path');

const server = app.listen(port, listening);  
function listening() {
    console.log(`Server running`);
    console.log(`listening on localhost: ${port}!`);
}

console.log(__dirname)


/* ROUTES */
app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})


// Route used by formHandler to access call to Geonames API via getCoordinates.js
app.post('/getTripDetails', function(req, res) {
  res.send(getTripDetails)
});

async function getTripDetails(req) {
  try {
    await getCoordinates(res);
    await  getForecast(res);
    await  getLocationImg(res);
    return res; // do i need this?
  } catch(error) {
    console.log('error ', error);
    }
  };

/* ORIGINAL INDEX.JS

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

app.post('/add', addData); */
