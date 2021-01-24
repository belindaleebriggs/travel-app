function updateUI(data, testDom) {
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
  
    countdownTitle.innerHTML = `Your Trip Begins In:`;
    countdown.innerHTML = `<h3 alt="time until trip">${data.daysToTrip} Days</h3>`;
  
  }

  function testForJest() { 
    let a = 1;
    let b = 2;
    return (a + b)
  }

  export { updateUI, testForJest }