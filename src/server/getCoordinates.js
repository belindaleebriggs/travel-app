async function getCoordinates(req) {
  console.log("::: getCoordinates is querying Geonames API for the coordinates of : ", destination);
  // Query Geonames API with destination to get it's longitude and latitude
  let tripData = req.body;
  let baseURL = 'api.geonames.org/search?';
  let user = '?user=' + process.env.GEONAMES_USER;
  let destination = req.body.formData.destination
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