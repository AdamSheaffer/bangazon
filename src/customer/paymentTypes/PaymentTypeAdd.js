import React, { Component } from "react";
import { Button, Form, Header } from "semantic-ui-react";

export default class PaymentTypeAdd extends Component {
  state = {
    name: ""
  };

  cancel = () => {
    this.props.onCancel();
  };

  handleFieldChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  addPayment = () => {
    this.props.onSubmit({
      name: this.state.name,
      active: true
    });
  };

  render() {
    return (
      <>
        <Form>
          <div className="purpleHeader">
            <Header as="h1" className="addSlideBarHeader" textAlign="center">
              Add New Payment Option
            </Header>
          </div>
          <div className="slideBarImg">
            <img
              src={require("../../images/Template-Pack.png")}
              alt="Computer"
              className="computerImage"
            />
          </div>
          <div className="fifteen wide field">
            <label>Payment Name</label>
            <input
              onChange={this.handleFieldChange}
              placeholder="Enter Payment Name"
              id="name"
            />
          </div>
          <div className="slideBarButtonContainer">
            <Button type="submit" color="orange" onClick={this.addPayment}>
              Add New Payment Option!
            </Button>
            <Button
              basic
              color="orange"
              content="Cancel"
              onClick={this.cancel}
            />
          </div>
        </Form>
      </>
    );
  }
}
