import React from "react";
import { Form, Header } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

class CustomerAddForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    phone: "",
    streetAddress: "",
    email: "",
    city: "",
    state: ""
  };

  handleFieldChange = evt => {
    this.setState({
      [evt.target.id]: evt.target.value
    });
  };

  submit = () => {
    this.props.onSubmit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      state: this.state.state,
      email: this.state.email,
      phone: this.state.phone,
      active: true
    });
  };

  render() {
    return (
      <Form>
        <div className="purpleHeader">
          <Header as="h1" className="addSlideBarHeader" textAlign="center">
            Add New Customer
          </Header>
        </div>
        <div className="slideBarImg">
          <img
            src={require("../../images/Leads.png")}
            alt="Computer"
            className="customer-image"
          />
        </div>
        <div className="fifteen wide field">
          <label>First Name</label>
          <input
            onChange={this.handleFieldChange}
            placeholder="First Name"
            id="firstName"
          />
        </div>
        <div className="fifteen wide field">
          <label>Last Name</label>
          <input
            onChange={this.handleFieldChange}
            placeholder="Last Name"
            id="lastName"
          />
        </div>
        <div className="fifteen wide field">
          <label>Address</label>
          <input
            onChange={this.handleFieldChange}
            placeholder="Address"
            id="address"
          />
        </div>
        <div className="fifteen wide field">
          <label>State</label>
          <input
            onChange={this.handleFieldChange}
            placeholder="State"
            id="state"
          />
        </div>
        <div className="fifteen wide field">
          <label>Email</label>
          <input
            onChange={this.handleFieldChange}
            placeholder="Email"
            id="email"
          />
        </div>
        <div className="fifteen wide field">
          <label>Phone</label>
          <input
            onChange={this.handleFieldChange}
            placeholder="phone"
            id="phone"
          />
        </div>

        <div className="slideBarButtonContainer">
          <Button type="submit" color="orange" onClick={this.submit}>
            Add New Customer!
          </Button>
          <Button
            basic
            color="orange"
            content="Cancel"
            onClick={this.props.onCancel}
          />
        </div>
      </Form>
    );
  }
}

export default CustomerAddForm;
