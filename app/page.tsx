import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div id="header">
          <h1 id="headertext">FoodFilter</h1>
      </div>

      <div id="main">
          <h3 id="slogan">Recipes, no yap</h3>
          <input type="text" id="input" placeholder="Enter Recipe URL"></input>
          <button id="go-button">Go!</button>
      </div>
    </>
  );
}

export function Results() {
  return (
    <>
      <div id="header">
          <h1 id="headertext">FoodFilter</h1>
      </div>

      <div id="result-container">
          <h3 id="results-header">Results</h3>
          <div className="result-body">
              <h3 id="allergy-warning" className="hidden">Allergy Warning: <span id="allergy-warning-text"></span></h3>
              <div className="result-content" id="ingredients">
                  <h3 className="result-content-header">Ingredients</h3>
                  <ul>
                      <li>blah blah</li>
                      <li>blah blah</li>
                      <li>blah blah</li>
                  </ul>
              </div>

              <div className="result-content" id="steps">
                  <h3 className="result-content-header">Steps</h3>
                  <ul>
                      <li>blah blah</li>
                      <li>blah blah</li>
                      <li>blah blah</li>
                  </ul>
              </div>

              <div className="result-content" id="nutrients">
                  <h3 className="result-content-header">Nutrition</h3>
                  <ul>
                      <li>blah blah</li>
                      <li>blah blah</li>
                      <li>blah blah</li>  
                  </ul>
              </div>
          </div>
      </div>
    </>
  );
}
