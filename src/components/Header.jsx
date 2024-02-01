import CitySeal from '../CitySeal.png'
import './Header.styles.module.css'
import {useState} from "react";

function Header({props}) {




  return (
      <header>

              <img src={CitySeal} alt="city"/>


          <div className="banner"><h3>City of Chattanooga |</h3> <h5>Office of Homelessness and Supportive Housing</h5></div>


          <nav>
              <ul>

                  <button onClick={props.handleToolChange} value={"rentCalculator"}> Fair Market Rent Calculator</button>
                  <button onClick={props.handleToolChange} value={"proRate"}>Prorated rent calculator</button>
              </ul>
          </nav>

      </header>
  );
}

export default Header;