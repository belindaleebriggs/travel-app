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