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
    return API.get("minions", `/minions/reserved/${this.props.match.params.id}`);
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  handleSubmit = async event => {
    let attachment;

    event.preventDefault();


    this.setState({ isLoading: true });

    try {


      await this.saveNote({
        content: this.state.content,
        attachment: attachment || this.state.note.attachment
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

unreserveMinion(minion) {
  return API.patch("minions", `/minions/reserved/${this.props.match.params.id}`);
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
          <LoaderButton
            block
            bsStyle="danger"
            bsSize="large"
            isLoading={this.state.isReserving}
            onClick={this.handleUnreserve}
            text="Cancel reservation"
            loadingText="Canceling..."
          />)

              }
}

handleUnreserve = async event => {
  event.preventDefault();

  const confirmed = window.confirm(
    "Are you sure you want to reserve this minion?"
  );

  try {
      await this.unreserveMinion({
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
          <ListGroupItem header={this.state.minion.name + "- Alignment: " + this.state.minion.mood + " -Price: $" + this.state.minion.price}>
              <p style={{textAlign: "center"}}>{this.state.minion.description}</p>
              <img className="image" src={this.state.minion.attachment} style={{width:'350px',borderRadius: '4px' }}/>
          </ListGroupItem>
          {this.reserveLogic()}

        </form>}
    </div>
  );
}

}
