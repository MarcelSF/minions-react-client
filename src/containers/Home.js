import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Minions!</h1>
          <p>Get every type of minion you want!</p>
          <div className="HomeImage">
            <img className="image" src="https://openbookopenheartdotcom.files.wordpress.com/2013/07/evil-minion-and-purple-animal-despicable-me-21.jpg"/>
          </div>
        </div>
      </div>
    );
  }
}
