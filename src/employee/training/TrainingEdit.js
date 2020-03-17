import React, { Component } from "react";
import APIManager from "../../api/APIManager";
import { Button, Form, Header } from "semantic-ui-react";

export default class TrainingEdit extends Component {
  state = {
    name: "",
    startDate: "",
    endDate: "",
    maxAttendees: "",
    employees: []
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateTraining = evt => {
    evt.preventDefault();
    const updatedTraining = {
      id: parseInt(this.props.training.id),
      name: this.state.name,
      startDate: new Date(this.state.startDate).toISOString(),
      endDate: new Date(this.state.endDate).toISOString(),
      maxAttendees: +this.state.maxAttendees
    };
    APIManager.updateData("trainingPrograms", updatedTraining).then(() =>
      this.props.onSuccess()
    );
  };

  componentDidMount() {
    const { id } = this.props.training;
    APIManager.getById("trainingPrograms", id).then(tp => {
      this.setState({
        name: tp.name,
        startDate: new Date(tp.startDate).toLocaleDateString(),
        endDate: new Date(tp.endDate).toLocaleDateString(),
        maxAttendees: tp.maxAttendees,
        employees: tp.employees
      });
    });
  }

  render() {
    return (
      <>
        <Form>
          <div className="purpleHeader">
            <Header as="h1" className="slideBarHeader">
              Edit Training
            </Header>
            <Header as="p" className="slideBarSubheader">
              Training ID: {this.props.training.id}
            </Header>
          </div>
          <div className="slideBarImg">
            <img
              src={require("../../images/Training.png")}
              alt="Computer"
              className="computerImage"
            />
          </div>
          <Header as="h2" className="no-margin-header" textAlign="center">
            Employees Registered
          </Header>
          <Header as="h2" className="no-margin-header" textAlign="center">
            {this.state.employees.length}
          </Header>
          <div className="fifteen wide field">
            <label>Training Name</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.name}
              id="name"
            />
          </div>
          <div className="fifteen wide field">
            <label>Start Date</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.startDate}
              id="startDate"
            />
          </div>
          <div className="fifteen wide field">
            <label>End Date</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.endDate}
              id="endDate"
            />
          </div>
          <div className="fifteen wide field">
            <label>Max Attendees</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.maxAttendees}
              id="maxAttendees"
            />
          </div>
          <div className="slideBarButtonContainer">
            <Button
              type="submit"
              color="orange"
              onClick={evt => this.updateTraining(evt)}
            >
              Edit Training Info
            </Button>
            <Button
              basic
              color="orange"
              content="Cancel"
              onClick={() => this.props.onCancel()}
            />
          </div>
        </Form>
      </>
    );
  }
}
