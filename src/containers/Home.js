import React, { Component } from "react";
import "./Home.css";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { Button } from 'react-bootstrap';


export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Minions!</h1>
          <p>Get every type of minion you want!</p>
          <LinkContainer to="/minions/available">
            <div className="HomeImage">
            <Button variant="success">
              Available Minions
            </Button>
              <Nav>
                <img className="image" src="https://openbookopenheartdotcom.files.wordpress.com/2013/07/evil-minion-and-purple-animal-despicable-me-21.jpg"/>
              </Nav>
            </div>
          </LinkContainer>
        </div>
      </div>
    );
  }
}
