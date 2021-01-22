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
    console.log(`::: Server running: listening on localhost: ${port}!`);
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
  // Setup empty JS object to act as endpoint and data transfer for getTripDetails
  let tripData = {};
  tripData = req.body.formData;
  console.log(`::: Server/Index.js: Trip Data delivered from formHandler: ${JSON.stringify(tripData)}`)

  getTripDetails(tripData) 
  .then((data) => { res.send(data)});
} catch (error) {
  console.log('error ', error);
  //appropriately handle error
  } 
})


// HANDLER FUNCTIONS

// Main Function for Route /getTripDetails
async function getTripDetails(tripData) {
  await getForecast(tripData)
    .then((data) => {
        tripData.weather = data;
        console.log(`::: getForecast returned weather of: ${tripData.weather}`);
      })
  await getDestinationImg(tripData)
    .then ((data) => {
        tripData.destinationImgURL = data;
        console.log(`::: tripData should now have forecast and imgURL: ${JSON.stringify(tripData)}`);
        return tripData;
      })
  .catch((error) => 
    console.log('error ', error)
    )};


  // START GET FORECAST - 2ndary Fxn for getTripDetails
  async function getForecast(tripData) {     
    let destination = tripData.destination;

    try { 
    // Get coordinates for using Geonames API 
    let coordinates = await getCoordinates(destination);
  
    // use coordinates to get weather from Weatherbit API
    const latitude = `&lat=${coordinates.lat}`;
    const longitude = `&lon=${coordinates.lon}`;
  
    let currentWeatherURL = 'http://api.weatherbit.io/v2.0/current?';
    let futureWeatherURL = 'http://api.weatherbit.io/v2.0/forecast/daily?';
    let apiKey = '&key=' + process.env.WEATHERBIT_API_KEY;     
  
    let baseURL = "";
    if ((Date - tripData.departureDate) < 7) {
        baseURL = currentWeatherURL
      } else { baseURL = futureWeatherURL };
    
    const language = '&lang=en';
    const units = '&units=I';
    const days = `days=7`;
    const apiUrl = baseURL + language + units + days + latitude + longitude + apiKey;

    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(`::: Weatherbit returned api data: ${JSON.stringify(data)}`);
    return data; 
  } catch (error) {
    console.log('error ', error);
    //appropriately handle error
}
};

//END GET FORECAST

// START GET COORDINATES -   2ndary Fxn for qryWeatherbit
// Query Geonames API with destination to get it's longitude and latitude for Weatherbit API
async function getCoordinates(destination) {
  let coordinates = {}; //object to store coordinates
  const baseURL = 'http://api.geonames.org/searchJSON?';
  let user = `&username=${process.env.GEONAMES_USER}`;  //THIS IS NOT PULLING THE USER NAME IN
  let name = `&name_equals=${encodeURIComponent(destination)}`;
  const outputFormat = '&of=json';
  const language = '&lang=en';
  const returnRows = '&maxRows=1'
  let apiUrl = baseURL + name + returnRows + language + outputFormat + user;
  
  try { 
    let res = await fetch(apiUrl);
    let apiData = await res.json();
    console.log(`::: getCoordinates Geonames API returned data: ${JSON.stringify(apiData)}`);
    coordinates.lat = apiData.geonames[0].lat;
    coordinates.lon = apiData.geonames[0].lng;
    console.log(`::: Coordinates retrieved from Geonames API: ${JSON.stringify(coordinates)}`)
    return coordinates;
  } catch (error) {
          console.log('error ', error);
          //appropriately handle error
    }
};
  
// END GET COORDINATES
 
// START GET DESTINATION IMG - 2ndary Fxn for getTripDetails
async function getDestinationImg(tripData) {
  let baseURL = 'https://pixabay.com/api/';
  let key = '?key=' + process.env.PIXABAY_API_KEY; 
  const query = `&q=${tripData.destination}`;
  const language = '&lang=en';
  const safe = `safesearch=true`;
  const type = `&image_type=photo`;
  const apiUrl = baseURL + key + query + language + safe + type;
  
  try { 
    let res = await fetch(apiUrl);
    let data = await res.json();
    console.log(`::: getdestinationImg retrieved image url: ${data.hits[0].webformatURL}`);
    return data.hits[0].webformatURL;
  } catch (error) {
    console.log('error ', error);
     //appropriately handle error
      } 
    };
// END GET DESTINATION IMG