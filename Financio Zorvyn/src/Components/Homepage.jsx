import React from 'react'
import Cards from './Cards'
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      <div id="header">
        <h1 id='title'>Financio</h1>
      </div>

      <div id="main">
        <h3 id='tagline'>
          Your Personal Assistant<br />
          for Keeping Track of<br />
          All your Finances.
        </h3>

        <div id="cards">
          <Cards text="Visualize your finances" title="Graphs"/>
          <Cards text="Smart analytics" title="Analytics"/>
          <Cards text="Track transactions" title="Transactions"/>
        </div>

        <button id='start_app' onClick={() => navigate("/dashboard")}>
          Start Financio
        </button>
      </div>
    </>
  )
}

export default Homepage