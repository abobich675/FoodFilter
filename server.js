const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = 3000;

const genAI = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/generate-image', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const result = await genAI.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt,
      config: { numberOfImages: 1 }
    });

    const imageBase64 = result.generatedImages[0].image.imageBytes;
    res.json({ image: imageBase64 });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
