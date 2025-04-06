import Link from 'next/link'
import React from 'react';

export default function Home() {
  
  return (
    <>
      <div id="header">
          <h1 id="headertext">FoodFilter</h1>
      </div>

      <div id="main">
          <h3 id="slogan">Recipes, no yap</h3>
          <input type="text" id="input" placeholder="Enter Recipe URL"></input>
          <Link href="/results"><button id="go-button"/></Link>
      </div>
    </>
  );
}