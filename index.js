import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "can you give me just the ingredients of this website (insert link here) and return it in JSON format?",
  });
  console.log(response.text);
}

main();
