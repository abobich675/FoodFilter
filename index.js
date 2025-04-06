function getURLInput() {
  var inputBox = document.getElementById('input');
  var url = inputBox.value;
  if (url) {
    return url;
  } else {
    alert("Please enter a URL");
    return null;
  }

}

async function handleGoButtonClick() {
  const url = getURLInput();

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
    console.log('Ingredients:', data.ingredients);
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