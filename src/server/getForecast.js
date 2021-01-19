function getForecast(formText.destination, formText.departureDate) {
  console.log("::: getForecast is querying Weatherbit API for the weather at : ", destination);
  // Query Weatherbit API with destination
  // put returned values for longitude and latitude into a new object called coordinates
  // eg. let coordinates = { response.lat, 
  //                         response.long  }
  // return this object to the calling procedure

  let currentWeatherURL = 'http://api.weatherbit.io/v2.0/current';
  let futureWeatherURL = 'http://api.weatherbit.io/v2.0/forecast/daily';

  let baseURL = () => {
      if ((Date - formText.departureDate) < 7) {
      return currentWeatherURL
      } else { return futureWeatherURL }
      };

  let apiKey = '?key=' + process.env.WEATHERBIT_API_KEY;

            // CODE BELOW HERE NEEDS UPDATING


  try { 
        qryWeatherbit(baseURL, req.body.formText, apiKey)  // is req.body.formtext what is coming in here? isn't it the lat and long from getCoordinates
        .then(function(data) {


  
          // Add data to data object in server.js via POST request
          const dataObject = {
              positivity: data.score_tag,
              truth_or_opinion: data.subjectivity,
              }
          console.log(`Positivity Score : ${dataObject.positivity}`);
          console.log(`Subjectivity Score : ${dataObject.truth_or_opinion}`);
          console.log(dataObject)
          res.send(dataObject)
          })
      } catch (error) {
          console.log('error ', error);
          //appropriately handle error
        } 
      }
  )
  
  // FUNCTIONS CALLED TO FULFILL formHandler qryWeatherbit request
  // function to make API call to Weatherbit API
  async function qryWeatherbit(baseURL, url, key) {
      console.log('Querying Weatherbit')
      const outputFormat = '&of=json';
      const urlToEvaluate = '&url=' + url;
      const model = '&model=example-model';
      const language = '&lang=en';
      const apiUrl = baseURL + key + outputFormat + urlToEvaluate + model + language;
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
}

export { getCoordinates }
