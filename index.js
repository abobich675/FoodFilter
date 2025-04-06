function getURLInput() {
  var inputBox = document.getElementById('input');
  var url = inputBox.value;
  if(!url){
    alert("Please enter a URL");
    return null;
  }

  //check if url is valid
  try{
    new URL(url);
    return url;
  } catch{
    alert("Please enter a valid URL");
    return null;
  }

}

async function handleGoButtonClick() {
  const url = getURLInput();

  if (!url) {
    return; // Exit if the URL is invalid or empty
  }

  try {
    // Send the URL to the backend via a POST request
    const response = await fetch('http://localhost:3000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }), // Send the URL in the request body
    });

    if (!response.ok) {
      throw new Error('Failed to fetch ingredients');
    }

    const data = await response.json();
    
    //store data to localStorage
    localStorage.setItem('result', JSON.stringify(data));
    window.location.href = 'result.html'; //redirect to result page

    /*
    // this part only works if we have the 
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `<pre>${JSON.stringify(data.ingredients, null, 2)}</pre>`;
    */
  } catch (error) {
    console.error(error);
    alert('An error occurred while fetching ingredients.');
  }
}

window.addEventListener('DOMContentLoaded', function () {
  var goButton = document.getElementById('go-button');
  goButton.addEventListener('click', handleGoButtonClick);
})

//testing how an actual json array should show

const testData = {
  ingredients: ["1 cup of flour", "2 eggs", "1/2 cup of sugar", "1 tsp of baking powder"]
}