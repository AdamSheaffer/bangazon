import React, { Component } from "react";
import APIManager from "../../api/APIManager";
import { Button, Form, Header, Dropdown } from "semantic-ui-react";
import { notify } from "react-notify-toast";

export default class EmployeeAdd extends Component {
  state = {
    departments: [],
    computers: [],
    newFirstName: "",
    newLastName: "",
    newDepartmentId: "",
    isSupervisor: null,
    newComputerId: "",
    newEmail: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleDeptDropdownChange = (e, { value }) =>
    this.setState({ newDepartmentId: value });

  handleSupervisorDropdownChange = (e, { value }) =>
    this.setState({ isSupervisor: value });

  handleComputerDropdownChange = (e, { value }) =>
    this.setState({ newComputerId: value });

  addEmployee = evt => {
    evt.preventDefault();
    const newEmployee = {
      firstName: this.state.newFirstName,
      lastName: this.state.newLastName,
      departmentId: parseInt(this.state.newDepartmentId),
      isSupervisor: this.state.isSupervisor,
      computerId: parseInt(this.state.newComputerId),
      email: this.state.newEmail
    };
    APIManager.addData("employees", newEmployee)
      .then(() => this.props.closeSidebar())
      .catch(err => {
        notify.show("There was an error adding your employee", "error");
      });
  };

  componentDidMount() {
    APIManager.getAll("departments")
      .then(departments => {
        const options = departments.map(d => {
          return {
            key: d.id,
            text: d.name,
            value: d.id
          };
        });
        this.setState({
          departments: options
        });
      })
      .catch(err => {
        notify.show("There was an error getting department data", "error");
      });

    APIManager.getComputersByAvailability(true)
      .then(computers => {
        const options = computers.map(c => {
          return {
            key: c.id,
            value: c.id,
            text: `${c.make} ${c.model}`
          };
        });
        this.setState({ computers: options });
      })
      .catch(err => {
        notify.show("There was an error getting computer data", "error");
      });
  }

  render() {
    const supervisorOptions = [
      { key: 1, text: "Yes", value: true },
      { key: 2, text: "No", value: false }
    ];

    const { dropdownValue } = this.state;

    return (
      <>
        <Form>
          <div className="purpleHeader">
            <Header as="h1" className="addSlideBarHeader">
              Add New Employee
            </Header>
          </div>
          <div className="slideBarImg">
            <img
              src={require("../../images/Employees.png")}
              alt="Computer"
              className="employeeImage"
            />
          </div>
          <div className="fifteen wide field">
            <label>Employee First Name</label>
            <input
              onChange={this.handleFieldChange}
              placeholder="Enter First Name"
              id="newFirstName"
            />
          </div>
          <div className="fifteen wide field">
            <label>Employee Last Name</label>
            <input
              onChange={this.handleFieldChange}
              placeholder="Enter Last Name"
              id="newLastName"
            />
          </div>
          <div className="fifteen wide field">
            <label>Choose Department</label>
            <Dropdown
              selection
              placeholder="Department Name"
              options={this.state.departments}
              value={dropdownValue}
              onChange={this.handleDeptDropdownChange}
              id="newDepartmentId"
            />
          </div>
          <div className="fifteen wide field">
            <label>Grant Supervisor Privileges?</label>
            <Dropdown
              selection
              placeholder="Supervisor Privileges?"
              options={supervisorOptions}
              value={dropdownValue}
              onChange={this.handleSupervisorDropdownChange}
              id="isSupervisor"
            />
          </div>
          <div className="fifteen wide field">
            <label>Computer ID</label>
            <Dropdown
              selection
              placeholder="Computer"
              options={this.state.computers}
              value={this.state.newComputerId}
              onChange={this.handleComputerDropdownChange}
              id="newComputerId"
            />
          </div>
          <div className="fifteen wide field">
            <label>E-mail Address</label>
            <input
              onChange={this.handleFieldChange}
              placeholder="Enter Email Address"
              id="newEmail"
            />
          </div>
          <div className="slideBarButtonContainer">
            <Button
              type="submit"
              color="orange"
              onClick={evt => this.addEmployee(evt)}
            >
              Create New Employee!
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
