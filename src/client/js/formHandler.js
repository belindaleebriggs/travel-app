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

  if (formData.destination === "" || formData.departureDate === "") {
    document.getElementById('tripErrorMsg').innerHTML = "You must enter a destination city and departure date.";
    return 
  } else {
  
    // reset error message on each new submission
  document.getElementById('tripErrorMsg').innerHTML = "";
  Client.calcDaysToTrip(formData);

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
      Client.updateUI(res) })
  .catch(err => {
        console.log(err)
        document.getElementById('tripErrorMsg').innerHTML = 'Server Error: ' + err;
         })
}
};

// listen on Generate button to trigger handleSubmit fxn
document.getElementById('generate').addEventListener('click', handleSubmit);

export { handleSubmit }


/* For Debugging Call getData and postData
getData('/all');
postData('/purple')

End for Debugging */
