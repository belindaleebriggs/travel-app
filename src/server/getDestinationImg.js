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