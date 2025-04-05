// // import { GoogleGenAI } from "@google/genai";
// const { GoogleGenAI } = require("@google/genai");

// // import * as fs from "node:fs";
// const fs = require('fs');


// async function generateImage(prompt) {

//   const ai = new GoogleGenAI({ apiKey: "GEMINI_KEY" });

//   const response = await ai.models.generateImages({
//     model: 'imagen-3.0-generate-002',
//     prompt: prompt,
//     config: {
//       numberOfImages: 1,
//     },
//   });

//   let idx = 1;
//   for (const generatedImage of response.generatedImages) {
//     let imgBytes = generatedImage.image.imageBytes;
//     const buffer = Buffer.from(imgBytes, "base64");
//     fs.writeFileSync(`imagen-${idx}.png`, buffer);
//     idx++;
//   }
// }

// async function generateJSON() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: "can you give me just the ingredients of this website (insert link here) and return it in JSON format?",
//   });
//   console.log(response.text);
// }

// function test() {
//   console.log("TEST!!");
// }


const { GoogleGenAI } = require('@google/genai');

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // Load from Vercel environment variable
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { prompt } = req.body;

  try {
    const result = await genAI.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt,
      config: { numberOfImages: 1 }
    });

    const base64 = result.generatedImages?.[0]?.image?.imageBytes;
    res.status(200).json({ image: base64 });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image generation failed' });
  }
};
