function getDestinationImg(destination) {
  console.log("::: getdestinationImg is querying Pixabay API for the coordinates of : ", destination);
  // Query Pixabay API with destination
  // put returned values for longitude and latitude into a new object called coordinates
  // eg. let coordinates = { response.lat, 
  //                         response.long  }
  // return this object to the calling procedure

  let baseURL = 'api.Pixabay.org/search?';
  let apiKey = '?key=' + process.env.PIXABAY_API_KEY; 
  
  try { 
        qryPixabay(baseURL, req.body.formText, apiKey)  // is req.body.formtext what is coming in here?
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
  
  // FUNCTIONS CALLED TO FULFILL formHandler qryPixabay request
  // function to make API call to Pixabay Sentiment API
  async function qryPixabay(baseURL, url, key) {
      console.log('Querying Pixabay')
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

export { getdestinationImg }
