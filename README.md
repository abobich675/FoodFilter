# FoodFilter

***Recipes, no yap.***

## Inspiration
Let's face it - recipe websites are the worst. What should be a simple list of ingredients and steps has become an endless scroll through life stories, popup ads, and SEO-stuffed paragraphs. Recipe Simplifier was born from the frustration of just wanting to know how much flour to use without having to read about someone's trip to Italy first.

## What it does
Recipe Simplifier transforms bloated recipe websites into clean, straightforward instructions. The application:
1. Uses Google's Gemini API to scrape recipe websites for the essential information and reformat the content
2. Calculates the nutritional facts of the recipe
3. Generates a simplified recipe display with only the necessary information
3. Uses Google's API to creates an AI-generated food image without requiring the original poster to supply a picture
4. Provides a clean, ad-free interface to view recipes

The end result is a streamlined cooking experience - no life stories, no excessive scrolling, just the recipe you need.

## How We Built It
Our team kept the tech stack simple and effective:

Built a Node.js application using Express for the server-side functionality
Integrated Google's Gemini API as the core AI component for processing recipe text and generating food images
Created a simple frontend to display the stripped-down recipes

The entire application follows a straightforward workflow: input a recipe URL, process the website text through Gemini API, and display only the essential cooking information.

## Website
https://foodfilter.onrender.com/

## Google Extension
For easier use of FoodFilter, use the google chrome extension.

### How to Set Up Google Extension:
After cloning the repository, go to the chrome extensions page (chrome://extensions/). To set up and use the extension, you must use Developer Mode (To do this, click the Developer Mode switch in the top right). Then click the “Load unpacked” button in the top left and select the FoodFilter extension folder, “chrome-extension” (found in the Github). Pin the new extension for easy access.

### How to Use the Google Extension
Find a recipe you like online. From the recipe’s webpage, click on the pinned extension and click “Simplify.” This will take you to the FoodFilter webpage where you need only click “Go” and see your simplified recipe.


## How to Run It
1. Clone the repository:
   ```bash
   git clone <https://github.com/abobich675/FoodFilter.git>
2. Create a .env file with your Google GenAI API key:
   ```ini
   GOOGLE_GENAI_API_KEY=your_api_key_here
3. Start the app:
   ```bash
   npm run start
*Oregon State Beaverhacks 2025 Submission*
