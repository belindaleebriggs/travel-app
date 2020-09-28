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

// Initialize all route with a callback function


// GET Route for OneWeatherMap API
// Grabs weather data when user clicks Generate button
let baseURL = 'api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=ce49415b2eb93662f798d48a60e01961';
const newWeatherLocation = document.getElementById('zip').value;
// listen on Generate button to trigger getWeatherData fxn
document.getElementById('generate').addEventListener('click', getWeatherData);

function getWeatherData (e) {
  getWeather(baseURL, newWeatherLocation, apiKey)
}

const getWeather = async (baseURL, location, key) => {
  const res = await fetch(baseURL + location + key)
      try { const data = await res.json();
      console.log(data);
      return data;
  } catch (error) {
    console.log('error ', error);
    //appropriately handle error
  }
    }

// GET Route for storing data ???
const weatherData = [];
app.get('/all' ,getData);
function getData (req, res) {
  res.send(weatherData);
  console.log(weatherData);
}


// Post Route

// To handle posting of data - think I might not actually need this?


const postData = async(url='', data = {}) => {
  const response = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type' : 'application/json',
  },
    body: JSON.stringify(data),
});
try {
  const newData = await response.json();
  return newData
  } catch (error) {
    console.log('error ', error);
    //appropriately handle error
  }
}

  // To handle updating of object with returned data

app.post('/', addWeather);

function addWeather(req, res) {
  newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  }
  projectData.push(newEntry);
  res.send(projectData);
  console.log(projectData);
}

// To handle updating of UI and object with returned data ??
