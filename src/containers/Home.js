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
          <p>For fans and collectors of all ages, we have every kind of minion you can think of!</p>
          <p>Click below for our available minions:</p>
          <LinkContainer to="/minions/available">
            <div className="HomeImage">
            <Button variant="primary">
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
