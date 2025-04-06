const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

app.use(express.static(__dirname));
app.use(express.json());

//get endpoints
app.get("/", function(req, res, next) {
    console.log("Request received")
    res.status(200).sendFile(__dirname + "/index.html")
})

app.get("/result", function(req, res) {
    res.status(200).sendFile(__dirname + "/result.html");
});

//post endpoint for genai response
app.post('/generate', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send({ error: 'URL is required' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Can you give me just the ingredients and measurements of ingredients, steps involving the ingredients, and nutrition facts of this website ${url} and return it in JSON string format? The JSON should only contain the ingredients and measurements of the respective ingredients, steps, and nutrition fact as 3 separate arrays, no other information. The JSON should be in the following format: '{ "ingredients": ["amount1 ingredient1", "amount2 ingredient2", ...], "steps": ["step1", "step2", ...], "nutrition": ["protein", "carbohydrates", "fats", "etc..."]}', where ingredients is an array of strings. Do not include any other information or text in the response. Just return the JSON object.`,
      temperature: 0.7
    });
    console.log('Response from Google GenAI:', response.text);
    console.log(typeof response.text)

    //clean the triple backticks and "json" label from response
    var jsonString = response.text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

    console.log('Cleaned response:', jsonString);
    res.send({jsonString});
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).send({ error: 'Failed to generate content' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});