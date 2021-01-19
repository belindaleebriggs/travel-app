/* Global Variables */
// designates what port the app will listen to for incoming requests
// Change when moving to environments (8080 dev, 8081 prod)
const port = 8080

async function handleSubmit(event) {
    event.preventDefault()

    // create object to hold form data
    let formData = {};

    // put data from form into an object to pass to API calling fxns
    formData.destination = document.getElementById('destination').value;
    formData.departureDate = document.getElementById('departureDate').value;

  
  // Reset answer area to clear out formatting if entering a new url
    var results = document.getElementById('destinationResults');
    results.innerHTML = "Your results will appear here.";
 
        console.log('Trying to launch getTripDetails from formHandler!')
        await fetch(`http://localhost:${port}/getTripDetails`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({formData: formData})
            },)
        // IF SENTIMENT API Returns the result back to formHandler use this to display the result
        // Although may be able to just display in SentimentAPI.js, unsure best method

        // THIS AREA NEEDS WORK
            .then(res => res.json()) 
            .then(function(res) {
                var resultsSection = document.getElementById('resultsSection');
                var results = document.getElementById('results');
                updateUI(res, resultsSection, results) 
            })
            .catch(err => {
                document.getElementById('errorMsg').innerHTML = 'Server Error: ' + err;
            })
      }


      function updateUI(data, resultsSection, results) {
            resultsSection.className += " " + 'answered';
            results.innerHTML = `This ${data.truth_or_opinion.toLowerCase()}ly written content earned a postitivity rating of ${data.positivity}.`;
      }

export { handleSubmit, updateUI }




// ORIGINAL APP.JS

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// GET Route for OneWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=ce49415b2eb93662f798d48a60e01961';

// function to make API call to openweathermap
const getWeather = async (baseURL, destination, key) => {
  let units = '&units=imperial';
  const apiUrl = baseURL + destination + key + units;
  const res = await fetch(apiUrl)
    try { const data = await res.json();
      return data;
    } catch (error) {
      console.log('error ', error);
          //appropriately handle error
        }
}

// listen on Generate button to trigger getWeatherData fxn
document.getElementById('generate').addEventListener('click', performAction);

// Grabs weather data when user clicks Generate button
function performAction(e){
  // get data from form
  const newZip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getWeather(baseURL, newZip, apiKey)
    .then(function(data) {
      console.log(data);
      // Add data to data object in server.js via POST request
      const dataObject = {
        date:d,
        feelings:feelings,
        temp:data.main.temp
      }
      postData('/add',dataObject);
    })
    .then (function(){
        updateUI();
      }
    )
}



// Process a post request
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
  console.log(`NewData is ${Object.values(newData)}`);
  return newData
  } catch (error) {
    console.log('error ', error);
    //appropriately handle error
  }
}

// Function to update the UI with the addData
const updateUI = async() => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    console.log(`UpdateUI allData: ${Object.values(allData)}`);
    console.log(`Temp: ${allData.temperature}`);
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temp: ${allData.temperature}`;
    document.getElementById('content').innerHTML = `You are feeling: ${allData.userResponse}`;
  } catch (error) {
    console.log('error ', error);
    document.getElementById('date').innerHTML = `Date: no data received`;
    document.getElementById('temp').innerHTML = `Temp: no data received`;
    document.getElementById('content').innerHTML = `You are feeling: no data received`;
  }


    }

export {updateUI, postData, performAction}


/* For Debugging Call getData and postData
getData('/all');
postData('/purple')

End for Debugging */
