/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Process a get request
const getData = async (url='') => {
  const request = await fetch(url);
  try {
    //transform into json
    const allData = await request.json()
  }
  catch(error) {
    console.log('error ', error);
    //more code to appropriately handle the error goes here
  }
}

// Process a post request
/* TODO: Finish postData request
const postData = async

// Call getData and postData
getData('/all');
postData('/purple')
