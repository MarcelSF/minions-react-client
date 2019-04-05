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
      Minion: null,
      name: "",
      attachmentURL: null
    };
  }

  async componentDidMount() {
    try {
      let attachmentURL;
      const minion = await this.getMinion();
      const { name, attachment } = minion;

      if (attachment) {
        attachmentURL = await Storage.vault.get(attachment);
      }

      this.setState({
        minion,
        name,
        attachmentURL
      });
    } catch (e) {
      alert(e);
    }
  }

  getMinion() {
    return API.get("minions", `/minions/${this.props.match.params.id}`);
  }


formatFilename(str) {
  return str.replace(/^\w+-/, "");
}

handleChange = event => {
  this.setState({
    [event.target.id]: event.target.value
  });
}

handleFileChange = event => {
  this.file = event.target.files[0];
}

handleSubmit = async event => {
  event.preventDefault();

  if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
    alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
    return;
  }

  this.setState({ isLoading: true });
}

handleDelete = async event => {
  event.preventDefault();

  const confirmed = window.confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmed) {
    return;
  }

  this.setState({ isDeleting: true });
}

render() {
  return (
    <div className="Minions">
      {this.state.minion &&
        <form onSubmit={this.handleSubmit}>
          <ListGroupItem header={this.name + "- Color: " + this.color}>
                <img className="image" src={this.attachment} style={{width:'150px',borderRadius: '4px',borderSolid: '1px' }}/>
              </ListGroupItem>

          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Save"
            loadingText="Saving…"
          />
          <LoaderButton
            block
            bsStyle="danger"
            bsSize="large"
            isLoading={this.state.isDeleting}
            onClick={this.handleDelete}
            text="Delete"
            loadingText="Deleting…"
          />
        </form>}
    </div>
  );
}

}
