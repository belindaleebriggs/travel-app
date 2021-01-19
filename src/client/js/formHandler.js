/* Global Variables */
// designates what port the app will listen to for incoming requests
// Change when moving to environments (8080 dev, 8081 prod)
const port = 8081

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
        // Display the data pulled from the APIs 
        
        // THIS AREA NEEDS WORK
            .then(res => res.json()) 
            .then(function(res) {
                updateUI(res) 
            })
            .catch(err => {
              console.log(err)
                document.getElementById('tripErrorMsg').innerHTML = 'Server Error: ' + err;
            })
      }


      function updateUI(data) {  
        var resultsSection = document.getElementById('resultsSection');
        resultsSection.className += " " + 'answered';
        
        var intro = document.getElementById('destinationResults');
        var destinationImg = document.getElementById('destinationImg');
        var weather = document.getElementById('weather');

        intro.innerHTML =`Here is a preview of what you might see on your trip to ${formData.destination}.</br> And a preview of the weather for ${formData.departureDate}.`;
        destinationImg.innerHTML = `<img class="medium-img" alt="Image of ${formData.destination} from Pixababy" src="${formData.imgURL}">`;
      }

// listen on Generate button to trigger handleSubmit fxn
document.getElementById('generate').addEventListener('click', handleSubmit);

export { handleSubmit, updateUI }


/* For Debugging Call getData and postData
getData('/all');
postData('/purple')

End for Debugging */
