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
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temp: ${allData.temp}`;
    document.getElementById('content').innerHTML = `You are feeling: ${allData.feelings}`;
  } catch (error) {
    console.log('error ', error);
    //appropriately handle error
  }


    }


/* For Debugging Call getData and postData
getData('/all');
postData('/purple')

End for Debugging */
