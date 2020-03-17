import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import APIManager from "../../api/APIManager";
import { Button, Form, Header } from "semantic-ui-react";
import "../../App.css";

class ComputerAdd extends Component {
  state = {
    newPurchaseDate: "",
    decomissionDate: null,
    newMake: "",
    newModel: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleDropdownChange = (e, { value }) =>
    this.setState({ decomissionDate: value });

  addComputer = evt => {
    evt.preventDefault();
    const newComputer = {
      purchaseDate:
        this.state.newPurchaseDate &&
        new Date(this.state.newPurchaseDate).toISOString(),
      make: this.state.newMake,
      model: this.state.newModel
    };
    APIManager.addData("computers", newComputer);
    this.props.closeSidebar();
    this.props.refresh();
    this.props.history.push("/employee-portal/computers/");
  };

  render() {
    return (
      <>
        <Form>
          <div className="purpleHeader">
            <Header as="h1" className="addSlideBarHeader">
              Add New Computer
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
              placeholder="MM/DD/YYYY"
              id="newPurchaseDate"
            />
          </div>
          <div className="fifteen wide field">
            <label>Computer Make</label>
            <input
              onChange={this.handleFieldChange}
              placeholder="Enter Computer Make"
              id="newMake"
            />
          </div>
          <div className="fifteen wide field">
            <label>Computer Model</label>
            <input
              onChange={this.handleFieldChange}
              placeholder="Enter Computer Model"
              id="newModel"
            />
          </div>
          <div className="slideBarButtonContainer">
            <Button
              type="submit"
              color="orange"
              onClick={evt => this.addComputer(evt)}
            >
              Add New Computer!
            </Button>
            <Button
              basic
              color="orange"
              content="Cancel"
              onClick={this.props.closeSidebar}
            />
          </div>
        </Form>
      </>
    );
  }
}

export default withRouter(ComputerAdd);
