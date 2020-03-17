import React, { Component } from "react";
import APIManager from "../../api/APIManager";
import { Button, Form, Header, Input } from "semantic-ui-react";
import "../../App.css";

export default class ComputerEdit extends Component {
  state = {
    purchaseDate: "",
    decomissionDate: "",
    make: "",
    model: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateComputer = evt => {
    evt.preventDefault();
    const updatedComputer = {
      id: this.props.computer.id,
      purchaseDate:
        this.state.purchaseDate &&
        new Date(this.state.purchaseDate).toISOString(),
      decomissionDate:
        this.state.decomissionDate &&
        new Date(this.state.decomissionDate).toISOString(),
      make: this.state.make,
      model: this.state.model
    };
    APIManager.updateData("computers", updatedComputer).then(() =>
      this.props.refresh()
    );
    this.props.closeSidebar();
  };

  componentDidMount() {
    const { id } = this.props.computer;
    APIManager.getById("computers", id).then(computer => {
      this.setState({
        purchaseDate:
          computer.purchaseDate &&
          new Date(computer.purchaseDate).toLocaleDateString(),
        decomissionDate:
          computer.decomissionDate &&
          new Date(computer.decomissionDate).toLocaleDateString(),
        make: computer.make,
        model: computer.model
      });
    });
  }

  render() {
    return (
      <>
        <Form>
          <div className="purpleHeader">
            <Header as="h1" className="slideBarHeader">
              Edit Computer
            </Header>
            <Header as="p" className="slideBarSubheader">
              Computer ID: {this.props.computer.id}
            </Header>
          </div>
          <div className="slideBarImg">
            <img
              src={require("../../images/API.png")}
              alt="Computer"
              className="computerImage"
            />
          </div>
          <div className="fifteen wide field">
            <label>Purchase Date</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.purchaseDate}
              id="purchaseDate"
            />
          </div>
          <div className="fifteen wide field">
            <label>Decomission Date</label>
            <Input
              onChange={this.handleFieldChange}
              id="decomissionDate"
              value={this.state.decomissionDate}
            />
          </div>
          <div className="fifteen wide field">
            <label>Computer Make</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.make}
              id="make"
            />
          </div>

          <div className="fifteen wide field">
            <label>Computer Model</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.model}
              id="model"
            />
          </div>
          <div className="slideBarButtonContainer">
            <Button
              type="submit"
              color="orange"
              content="Edit Computer Info"
              onClick={evt => this.updateComputer(evt)}
            ></Button>
            <Button
              basic
              color="orange"
              content="Cancel"
              onClick={this.props.closeSidebar}
            />
          </div>
          <br></br>
        </Form>
      </>
    );
  }
}
