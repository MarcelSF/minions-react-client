import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel, PageHeader, ListGroup, ListGroupItem  } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Minions.css";


export default class Minions extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isReserving: null,
      Minion: null,
      name: "",
      reserved_by: " ",
    };
  }

  async componentDidMount() {
    try {
      let attachmentURL;
      const minion = await this.getMinion();
      const { reserved_by } = minion;

      this.setState({
        minion,
        reserved_by
      });
    } catch (e) {
      alert(e);
    }
  }



  getMinion() {
    return API.get("minions", `/minions/${this.props.match.params.id}`);
  }




  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  saveNote(note) {
    return API.put("notes", `/notes/${this.props.match.params.id}`, {
      body: note
    });
  }



  reserveMinion(minion) {
    return API.patch("minions", `/minions/${this.props.match.params.id}`);
  }

  reserveLogic(minion) {
    if (this.state.minion.reserved_by === " ") {
    return (
            <LoaderButton
              block
              bsStyle="success"
              bsSize="large"
              isLoading={this.state.isReserving}
              onClick={this.handleReserve}
              text="Reserve"
              loadingText="Reserving..."
            />)
                } else {
                  return (
                    <p> You have already reserved this minion!</p>
                  )
                }
  }

  handleReserve = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to reserve this minion?"
    );

    try {
        await this.reserveMinion({
        });
        this.props.history.push("/");
      } catch (e) {
        alert(e);
        this.setState({ isLoading: false });
      }
    this.setState({ isReserving: true });
  }

render() {
  return (
    <div className="Minions">
      {this.state.minion &&
        <form onSubmit={this.handleSubmit}>

            <div className="minion-card">
              <div className="minion-text">
                <p style={{fontWeight: "bold"}}>{this.state.minion.name}</p>
                <p style={{fontWeight: "bold"}}>{"Some info about " + this.state.minion.name + ": "}</p>
                <p>{this.state.minion.description}</p>
                <p style={{fontWeight: "bold"}}>{"Price: $" + this.state.minion.price}</p>
                <p style={{fontWeight: "bold"}}>{"Alignment: " + this.state.minion.mood}</p>
                <p style={{fontWeight: "bold"}}>{"Color: " + this.state.minion.color}</p>
              </div>
              <div className="minion-image">
                <img className="image" src={this.state.minion.attachment} style={{width:'350px',borderRadius: '4px' }}/>
              </div>
            </div>

          {this.reserveLogic()}

        </form>}
    </div>
  );
}

}
