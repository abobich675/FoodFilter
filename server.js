const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

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
    
    // Parse the JSON to extract recipe information
    let recipeData;
    try {
      recipeData = JSON.parse(jsonString);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      recipeData = { ingredients: [], steps: [], nutrition: [] };
    }
    
    // generate image prompt
    const imagePrompt = `Can you create an image of a dish based off of this website? ${recipeData.ingredients.slice(0, 5).join(', ')}`;
    
    try {
      // Make sure the public directory exists
      const publicDir = path.join(__dirname, 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      
      const imageResponse = await ai.models.generateContent({
        model: "gemini-2.0-flash-exp-image-generation",
        contents: imagePrompt,
        config: {
          responseModalities: ["Text", "Image"],
        },
      });
      
      let imagePath = '';
      
      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
          imagePath = "public/recipe-image.png";
          fs.writeFileSync(imagePath, buffer);
          console.log("Recipe image saved as recipe-image.png");
        }
      }
      
      res.send({
        jsonString,
        imageUrl: '/public/recipe-image.png'
      });
      
    } catch (imageError) {
      console.error('Error generating image:', imageError);
      // Still return the recipe data even if image generation fails
      res.send({ jsonString });
    }
    
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).send({ error: 'Failed to generate content' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
