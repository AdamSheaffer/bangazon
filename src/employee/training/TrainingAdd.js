import React, { Component } from "react";
import APIManager from "../../api/APIManager";
import { Button, Form, Header } from "semantic-ui-react";

export default class TrainingAdd extends Component {
  state = {
    newTrainingName: "",
    newStartDate: "",
    newEndDate: "",
    newMaxAttendees: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  addTraining = evt => {
    evt.preventDefault();
    const newTraining = {
      name: this.state.newTrainingName,
      startDate: new Date(this.state.newStartDate).toISOString(),
      endDate: new Date(this.state.newEndDate).toISOString(),
      maxAttendees: this.state.newMaxAttendees
    };
    APIManager.addData("trainingPrograms", newTraining).then(() => {
      this.setState({
        newTrainingName: "",
        newStartDate: "",
        newEndDate: "",
        newMaxAttendees: ""
      });
      this.props.refresh();
    });
    this.props.closeSidebar();
  };

  render() {
    return (
      <>
        <Form>
          <div className="purpleHeader">
            <Header as="h1" className="addSlideBarHeader">
              Create Training
            </Header>
          </div>
          <div className="slideBarImg">
            <img
              src={require("../../images/Training.png")}
              alt="Computer"
              className="computerImage"
            />
          </div>
          <div className="fifteen wide field">
            <label>Training Name</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.newTrainingName}
              id="newTrainingName"
            />
          </div>
          <div className="fifteen wide field">
            <label>Start Date</label>
            <input
              onChange={this.handleFieldChange}
              placeholder="MM/DD/YYYY"
              value={this.state.newStartDate}
              id="newStartDate"
            />
          </div>
          <div className="fifteen wide field">
            <label>End Date</label>
            <input
              onChange={this.handleFieldChange}
              placeholder="MM/DD/YYYY"
              value={this.state.newEndDate}
              id="newEndDate"
            />
          </div>
          <div className="fifteen wide field">
            <label>Max Attendees</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.newMaxAttendees}
              id="newMaxAttendees"
            />
          </div>
          <div className="slideBarButtonContainer">
            <Button
              type="submit"
              color="orange"
              onClick={evt => this.addTraining(evt)}
            >
              Create Training Event
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
