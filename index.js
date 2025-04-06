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

  const loadingContainer = document.getElementById('loading-container');
  loadingContainer.classList.add('active');

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
    loadingContainer.classList.remove('active');
    window.location.href = 'result.html'; //redirect to result page

  } catch (error) {
    console.error(error);
    alert('An error occurred while fetching ingredients.');
  }
}

// check for URL param 
function checkForURLParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlParam = urlParams.get('url');
  
  if (urlParam) {
    const inputBox = document.getElementById('input');
    inputBox.value = decodeURIComponent(urlParam);
  }
}

window.addEventListener('DOMContentLoaded', function () {
  var goButton = document.getElementById('go-button');
  goButton.addEventListener('click', handleGoButtonClick);
  checkForURLParam();
})
