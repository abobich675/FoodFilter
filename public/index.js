async function generateImage(prompt) {
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
  
    const data = await res.json();
    document.getElementById("output").src = `data:image/png;base64,${data.image}`;
  }
  