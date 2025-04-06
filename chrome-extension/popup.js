
  
document.addEventListener('DOMContentLoaded', function() {
  const simplifyButton = document.getElementById('simplify');
  
  simplifyButton.addEventListener('click', function() {
    // current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentUrl = tabs[0].url;
      
      // redirect to
      const foodFilterUrl = `https://foodfilter.onrender.com/?url=${encodeURIComponent(currentUrl)}`;
      chrome.tabs.create({ url: foodFilterUrl });
    });
  });
});

