import React, { Component } from "react";
import APIManager from "../../api/APIManager";
import { Button, Form, Header, Dropdown } from "semantic-ui-react";

export default class EmployeeEdit extends Component {
  state = {
    departments: [],
    computers: [],
    firstName: "",
    lastName: "",
    departmentId: "",
    isSupervisor: null,
    computerId: "",
    email: ""
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
      .then(() => {
        const id = this.props.employee.id;
        APIManager.getById("employees", id).then(e => {
          this.setState({
            firstName: e.firstName,
            lastName: e.lastName,
            departmentId: e.departmentId,
            isSupervisor: e.isSupervisor,
            computerId: e.computerId,
            email: e.email,
            computer: e.computer
          });
        });
      })
      .then(() => {
        APIManager.getComputersByAvailability(true).then(comps => {
          const allComputers = this.state.computer
            ? [this.state.computer, ...comps]
            : [...comps];
          const options = allComputers.map(c => {
            return {
              key: c.id,
              text: `${c.make} ${c.model}`,
              value: c.id
            };
          });
          this.setState({
            computers: options
          });
        });
      });
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleDeptDropdownChange = (e, { value }) =>
    this.setState({ departmentId: value });

  handleSupervisorDropdownChange = (e, { value }) =>
    this.setState({ isSupervisor: value });

  handleComputerDropdownChange = (e, { value }) =>
    this.setState({ computerId: value });

  updateEmployee = evt => {
    evt.preventDefault();
    const updatedEmployee = {
      id: parseInt(this.props.employee.id),
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      departmentId: parseInt(this.state.departmentId),
      isSupervisor: this.state.isSupervisor,
      computerId: parseInt(this.state.computerId),
      email: this.state.email
    };
    APIManager.updateData("employees", updatedEmployee).then(() => {
      this.props.closeSidebar();
      this.props.onUpdate();
    });
  };

  render() {
    const supervisorOptions = [
      { key: 1, text: "Yes", value: true },
      { key: 2, text: "No", value: false }
    ];

    return (
      <>
        <Form>
          <div className="purpleHeader">
            <Header as="h1" className="slideBarHeader">
              Edit Employee
            </Header>
            <Header as="p" className="slideBarSubheader">
              Employee ID: {this.props.employee.id}
            </Header>
          </div>
          <div className="fifteen wide field">
            <div className="slideBarImg">
              <img
                src={require("../../images/Employees.png")}
                alt="Computer"
                className="employeeImage"
              />
            </div>
            <label>Employee First Name</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.firstName}
              id="firstName"
            />
          </div>
          <div className="fifteen wide field">
            <label>Employee Last Name</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.lastName}
              id="lastName"
            />
          </div>
          <div className="fifteen wide field">
            <label>Choose Department</label>
            <Dropdown
              selection
              value={this.state.departmentId}
              options={this.state.departments}
              onChange={this.handleDeptDropdownChange}
              id="departmentId"
            />
          </div>
          <div className="fifteen wide field">
            <label>Grant Supervisor Privileges?</label>
            <Dropdown
              selection
              value={this.state.isSupervisor}
              options={supervisorOptions}
              onChange={this.handleSupervisorDropdownChange}
              id="isSupervisor"
            />
          </div>
          <div className="fifteen wide field">
            <label>Computer</label>
            <Dropdown
              selection
              value={this.state.computerId}
              options={this.state.computers}
              onChange={this.handleComputerDropdownChange}
              id="computerId"
            />
          </div>
          <div className="fifteen wide field">
            <label>E-mail Address</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.email}
              id="email"
            />
          </div>
          <div className="slideBarButtonContainer">
            <Button
              type="submit"
              color="orange"
              onClick={evt => this.updateEmployee(evt)}
            >
              Edit Employee Info
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
