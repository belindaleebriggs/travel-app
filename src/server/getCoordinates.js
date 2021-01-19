function getCoordinates(destination) {
  console.log("::: getCoordinates is querying Geonames API for the coordinates of : ", destination);
  // Query Geonames API with destination
  // put returned values for longitude and latitude into a new object called coordinates
  // eg. let coordinates = { response.lat, 
  //                         response.long  }
  // return this object to the calling procedure
   // CODE BELOW HERE NEEDS UPDATING
  let baseURL = 'api.geonames.org/search?';
  // let apiKey = '?key=' + process.env.GEONAMES_API_KEY; - no key in geonames just user name
  let user = '?user=' + process.env.GEONAMES_USER;
  
  try { 
        qryGeonames(baseURL, encodeURIComponent(req.body.formText), apiKey)
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
  );
  
  // FUNCTIONS CALLED TO FULFILL formHandler qryGeonames request
  // function to make API call to Geonames Sentiment API
  async function qryGeonames(baseURL, url, key) {
      console.log('Querying Geonames')
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
