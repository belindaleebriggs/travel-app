// Setup empty JS object to act as endpoint for all routes
tripData = {}; // DO I NEED THIS?

// Express to run server and routes
// Change when moving to environments (8080 dev, 8081 prod)
const port = 8081;

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
  try {
  let tripData = req.body.formData;
  console.log(`Server Index.js: Trip Data delivered from formHandler: ${tripData}`)
  getTripDetails(tripData) 
  .then((data) => { res.send(data)});
} catch (error) {
  console.log('error ', error);
  //appropriately handle error
  } 
})

async function getTripDetails(tripData) {
  try {
    await getCoordinates(tripData);
    await getForecast(res);
    await getDestinationImg(res);
    return res; // do i need this?
  } catch(error) {
    console.log('error ', error);
    }
  };

  // START GET COORDINATES
  async function getCoordinates(req) {

    // Query Geonames API with destination to get it's longitude and latitude
    let tripData = req.body;
    let baseURL = 'api.geonames.org/search?';
    let user = '?user=' + process.env.GEONAMES_USER;
    let destination = req.body.formData.destination

    console.log("::: getCoordinates is querying Geonames API for the coordinates of : ", destination);
    
    try { 
          let newData = qryGeonames(baseURL, encodeURIComponent(destination), user)
          .then(function(newData) { 
    
            // Add data to data object in server.js via POST request
            tripData.lat = newData.lat;
            tripData.long = newData.long;
            console.log(`Trip Location Latitude: ${tripData.lat}`);
            console.log(`Trip Location Latitude: ${tripData.long}`);
            console.log(`Trip Data: ${tripData}`)
            res.send(tripData)
            })
        } catch (error) {
            console.log('error ', error);
            //appropriately handle error
          } 
  };
    
    // FUNCTIONS CALLED TO FULFILL formHandler qryGeonames request
    // function to make API call to Geonames Sentiment API
    async function qryGeonames(baseURL, destination, user) {
        console.log('Querying Geonames')
        const outputFormat = '&of=json';
        const name = '&name_equals=' + destination;
        const language = '&lang=en';
        const returnRows = '&maxRows=1'
        const apiUrl = baseURL + name + returnRows + language + outputFormat;
        console.log(apiUrl);
        const res = await fetch(apiUrl);
        try {
          const data = await res.json();
          return data;
        } catch (error) {
          console.log('error ', error);
          //appropriately handle error
        }
      }
  // END GET COORDINATES


  // START GET DESTINATION IMG
  function getDestinationImg(req) {
  
    // Query Pixabay API with destination
    // put returned values for longitude and latitude into a new object called coordinates
    // eg. let coordinates = { response.lat, 
    //                         response.long  }
    // return this object to the calling procedure
  
    let baseURL = 'api.Pixabay.org/search?';
    let key = '?key=' + process.env.PIXABAY_API_KEY; 
    let destination = req.body.formData.destination
    console.log("::: getdestinationImg is querying Pixabay API for the coordinates of : ", formData.destination);
    
    try { 
      let newData = qryPixabay(baseURL, encodeURIComponent(destination), key)
      .then(function(newData) { 
            
        // Add data to data object in server.js via POST request
        tripData.imgURL = newData.hits[0].webformatURL;
        console.log(`Trip Img URL: ${tripData.imgURL}`);
        console.log(`Trip Data: ${tripData}`)
        res.send(tripData)
        })
        } catch (error) {
          console.log('error ', error);
          //appropriately handle error
          } 
      };
                  
    // FUNCTIONS CALLED TO FULFILL formHandler qryGeonames request
    // function to make API call to Geonames Sentiment API
    async function qryPixabay(baseURL, destination, key) {
      console.log('Querying Pixabay')
      const language = '&lang=en';
      const apiKey = `&key=${key}`;
      const query = `q=${destination}`;
      const safe = `safesearch=true`
      const apiUrl = baseURL + query + language + safe + apiKey;
      console.log(apiUrl);
      const res = await fetch(apiUrl);
        try {
          const data = await res.json();
            return data;
          }catch (error) {
              console.log('error ', error);
              //appropriately handle error
            }
    }
  // END GET DESTINATION IMG


  // START GET FORECAST
  async function getForecast(formData) {
    console.log("::: getCoordinates is querying Geonames API for the coordinates of : ", destination);
    // Query Weatherbit API with destination
    let tripData = req.body;
  
    let currentWeatherURL = 'http://api.weatherbit.io/v2.0/current';
    let futureWeatherURL = 'http://api.weatherbit.io/v2.0/forecast/daily';
  
    let baseURL = () => {
        if ((Date - formText.departureDate) < 7) {
        return currentWeatherURL
        } else { return futureWeatherURL }
        };
  
    let apiKey = '?key=' + process.env.WEATHERBIT_API_KEY;
    let lat = req.body.formData.lat;
    let lon = req.body.formDatalon;
                
    try { 
      let newData = qryWeatherbit(baseURL, lat, lon, key)
      .then(function(newData) { 
            
      // Add data to data object in server.js via POST request
      tripData.weather = newData.weather;
      console.log(`Trip Weather Details: ${tripData.weather}`);
      console.log(`Trip Data: ${tripData}`)
      res.send(tripData)
      })
      } catch (error) {
        console.log('error ', error);
        //appropriately handle error
        } 
    };
                
  // FUNCTIONS CALLED TO FULFILL formHandler qryGeonames request
  // function to make API call to Geonames Sentiment API
  async function qryWeatherbit(baseURL, lat, lon, key) {
    console.log('Querying Weatherbit')
    const latitude = `&lat=${lat}`;
    const longitude = `&lon=${lon}`;
    const language = '&lang=en';
    const units = '&units=I';
    const apiKey = `&key=${key}`;
    const days = `days=7`;
    const apiUrl = baseURL + language + units + days + latitude + longitude  + apiKey;
    console.log(apiUrl);
    const res = await fetch(apiUrl);
      try {
        const data = await res.json();
          return data;
        }catch (error) {
            console.log('error ', error);
            //appropriately handle error
          }
  }
  //END GET FORECAST



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
