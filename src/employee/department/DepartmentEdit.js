import React, { Component } from "react";
import APIManager from "../../api/APIManager";
import { Button, Form, Header } from "semantic-ui-react";
import { notify } from "react-notify-toast";

export default class DepartmentEdit extends Component {
  state = {
    departments: [],
    name: "",
    budget: "",
    totalEmployees: null
  };

  componentDidMount() {
    const { id } = this.props.department;
    APIManager.getDeptWithEmployees(id)
      .then(d => {
        this.setState({
          name: d.name,
          budget: d.budget,
          totalEmployees: d.employees && d.employees.length
        });
      })
      .catch(err => {
        notify.show("There was an error getting department data", "error");
      });
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateDepartment = evt => {
    evt.preventDefault();
    const updatedDepartment = {
      id: this.props.department.id,
      name: this.state.name,
      budget: parseInt(this.state.budget)
    };

    APIManager.updateData("departments", updatedDepartment)
      .then(() => {
        this.props.refresh();
        this.props.closeSidebar();
      })
      .catch(err => {
        notify.show("There was an error updating your department", "error");
      });
  };

  render() {
    return (
      <>
        <Form>
          <div className="purpleHeader">
            <Header as="h1" className="slideBarHeader">
              Edit Department
            </Header>
            <Header as="p" className="slideBarSubheader">
              Department ID: {this.props.department.id}
            </Header>
          </div>
          <div className="slideBarImg">
            <img
              src={require("../../images/Departments.png")}
              alt="Computer"
              className="departmentImage"
            />
          </div>
          <Header as="h2" className="no-margin-header" textAlign="center">
            Total # Employees
          </Header>
          <Header as="h2" className="no-margin-header" textAlign="center">
            {this.state.totalEmployees}
          </Header>
          <div className="fifteen wide field">
            <label>Department Name</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.name}
              id="name"
            />
          </div>
          <div className="fifteen wide field">
            <label>Department Budget</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.budget}
              id="budget"
            />
          </div>
          <div className="slideBarButtonContainer">
            <Button
              type="submit"
              color="orange"
              onClick={evt => this.updateDepartment(evt)}
            >
              Edit Department Info
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
