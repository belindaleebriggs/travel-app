/* Global Variables */
// designates what port the app will listen to for incoming requests
// Change when moving to environments (8080 dev, 8081 prod)
const port = 8081;

async function handleSubmit(event) {
  event.preventDefault()

  // create object to hold form data
  let formData = {};

  // put data from form into an object to pass to API calling fxns
  formData.destination = document.getElementById('destination').value; 
  formData.departureDate = document.getElementById('departureDate').value;
  calcDaysToTrip(formData);


  console.log(`formData value:` + JSON.stringify(formData));
    
  // Hide Forecast results area and clear out formatting when entering a new url
  const forecastTitle = document.getElementById('forecastTitle');
  forecastTitle.innerHTML = "<h2>Your Trip Forecast</h2>";
  const results = document.getElementById('weather');
  results.innerHTML = "Your forecast results will appear here shortly.";
    
  console.log('Trying to launch getTripDetails from formHandler!')
  console.log(`formHandler: Form data entered: Destination - ${formData.destination} and Departure Date - ${formData.departureDate}`)
  await fetch(`http://localhost:${port}/getTripDetails`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
           'Content-Type': 'application/json'
            },
    body: JSON.stringify({formData: formData})
            },)
    
    // Display the data pulled from the APIs  
    // THIS AREA NEEDS WORK
  .then(res => res.json()) 
  .then(function(res) {
      updateUI(res) })
  .catch(err => {
        console.log(err)
        document.getElementById('tripErrorMsg').innerHTML = 'Server Error: ' + err;
         })
};

function calcDaysToTrip(formData) {
  // Set the date we're counting down to
  let countDownDate = new Date(formData.departureDate).getTime();
  // Update the count down every 1 second
  var x = setInterval(function() { 
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //Set value of 
    formData.daysToTrip = days;

    // Display the result in the element with id="countdown"
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "Date has passed";
  }
}, 1000);
;};

function updateUI(data) {

  // Show and Format Results Section
  var resultsSection = document.getElementById('resultsSection');
  resultsSection.className += " " + 'answered';
  
  // Add Weather to UI
  const iconURL = `https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`;
      
  var weather = document.getElementById('weather');
  var destinationImg = document.getElementById('destinationImg');
  var weatherIcon = document.getElementById('weatherIcon');

  weather.innerHTML =`${data.weather.description}`;
  weatherIcon.innerHTML =`<img alt="weather icon" src="${iconURL}">`;
  destinationImg.innerHTML = `<img class="medium-img" alt="Image of ${data.destination} from Pixababy" src="${data.destinationImgURL}">`;
  
  // Add Countdown to UI
  const countdownTitle = document.getElementById('countdownTitle');
  const countdown = document.getElementById('countdown');

  countdownTitle.innerHTML = `Trip Begins In`;
  countdown.innerHTML = `<h3 alt="time until trip">${data.daysToTrip} Days</h3>`;

}

// listen on Generate button to trigger handleSubmit fxn
document.getElementById('generate').addEventListener('click', handleSubmit);

export { handleSubmit, updateUI }


/* For Debugging Call getData and postData
getData('/all');
postData('/purple')

End for Debugging */
