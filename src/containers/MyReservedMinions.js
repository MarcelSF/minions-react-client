import React, { Component } from "react";
import "./MyReservedMinions.css";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";



export default class MyReservedMinions extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: true,
        minions: []
      };
    }

  renderMinionsList(minions) {
    return [{}].concat(minions).map(
      (minion, i) =>
        i !== 0
          ? <LinkContainer
              key={minion.minionId}
              to={`/minions/reserved/${minion.minionId}`}
            >
              <ListGroupItem header={minion.name.trim().split("\n")[0]}>
                <p>{"Description: " + (minion.description)}</p>
                <p>{"Alignment: " + (minion.mood)}</p>
                <p>{"Price: $" + (minion.price)}</p>
                <img className="image" src={minion.attachment} style={{width:'150px',borderRadius: '4px',borderSolid: '1px' }}/>
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to=""
            >
              <ListGroupItem>
              </ListGroupItem>
            </LinkContainer>
    );
  }


  renderLander() {
    return (
      <div className="lander">
        <h1>Minions</h1>
        <p>For Everyone!</p>
      </div>
    );
  }

  renderMinions() {
    return (
      <div className="minions">
        <PageHeader>Your reserved minions</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderMinionsList(this.state.minions)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="reservedMinions">
        {this.props.isAuthenticated ? this.renderMinions() : this.renderLander()}
      </div>
    );
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

      try {
        const minions = await this.minions();
        this.setState({ minions });
      } catch (e) {
        alert(e);
      }

      this.setState({ isLoading: false });
  }

  minions() {
    return API.get("minions", "/minions/reserved");
  }
}
