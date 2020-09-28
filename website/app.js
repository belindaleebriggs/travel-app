/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// GET Route for OneWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=ce49415b2eb93662f798d48a60e01961';

// function to make API call to openweathermap
const getWeather = async (baseURL, location, key) => {
  const apiUrl = baseURL + location + key;
  console.log(apiUrl);
  const res = await fetch(apiUrl)
    try { const data = await res.json();
      return data;
      console.log(data);
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
      postData('/add',{date:d,temp:data.main.temp,feelings:feelings});
      updateUI();
    });
}



// Process a post request
const postData = async(url='', data = {}) => {
  console.log(data);
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

// Function to update the UI with the addData
const updateUI = async() => {
  const request = await fetch('/all')
  try {
    const allData = await request.json()
    document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
    document.getElementById('temp').innerHTML = `Temp: ${allData[0].temp}`;
    document.getElementById('content').innerHTML = `You are feeling: ${allData[0].feelings}`;
  } catch (error) {
    console.log('error ', error);
    //appropriately handle error
  }


    }


/* For Debugging Call getData and postData
getData('/all');
postData('/purple')

End for Debugging */
