import React from "react";
import { Input, List, Modal, Button } from "semantic-ui-react";
import { Component } from "react";
import APIManager from "../../api/APIManager";

export default class TrainingAssignment extends Component {
  state = {
    trainings: [],
    searchTerm: "",
    modalOpen: false,
    selectedTraining: null,
    isAlreadyInProgram: false
  };

  componentDidMount() {
    APIManager.getAll("trainingPrograms").then(trainings => {
      this.setState({
        trainings
      });
    });
  }

  inputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onTrainingProgramSelect = programId => {
    const { employee } = this.props;
    APIManager.getById("trainingPrograms", programId).then(tp => {
      const isAlreadyInProgram = !!tp.employees.find(e => e.id === employee.id);
      debugger;
      this.setState({
        modalOpen: true,
        selectedTraining: tp,
        isAlreadyInProgram
      });
    });
  };

  registerProgram = () => {
    const programId = this.state.selectedTraining.id;
    APIManager.addEmployeeToTrainingProgram(
      programId,
      this.props.employee
    ).then(() => {
      this.setState({
        modalOpen: false
      });
    });
  };

  unregisterProgram = () => {
    const programId = this.state.selectedTraining.id;
    const empId = this.props.employee.id;
    APIManager.removeEmployeeFromTrainingProgram(programId, empId).then(() => {
      this.setState({
        modalOpen: false
      });
    });
  };

  render() {
    const {
      trainings,
      searchTerm,
      modalOpen,
      selectedTraining,
      isAlreadyInProgram
    } = this.state;
    const { employee } = this.props;
    return (
      <>
        <Input
          fluid
          value={searchTerm}
          onChange={this.inputChange}
          id="searchTerm"
          placeholder="Search Training Programs"
        />
        <List divided relaxed="very">
          {!!searchTerm
            ? trainings
                .filter(t =>
                  t.name.toUpperCase().includes(searchTerm.toUpperCase())
                )
                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                .map(t => (
                  <List.Item key={t.id}>
                    <List.Icon
                      name="calendar outline"
                      size="large"
                      verticalAlign="middle"
                    />
                    <List.Content>
                      <List.Header
                        as="a"
                        onClick={() => this.onTrainingProgramSelect(t.id)}
                      >
                        {t.name}
                      </List.Header>
                      <List.Description as="p">
                        {new Date(t.startDate).toLocaleDateString()} -{" "}
                        {new Date(t.endDate).toLocaleDateString()}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))
            : trainings
                .slice(0, 3)
                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                .map(t => (
                  <List.Item key={t.id}>
                    <List.Icon
                      name="calendar outline"
                      size="large"
                      verticalAlign="middle"
                    />
                    <List.Content>
                      <List.Header
                        as="a"
                        onClick={() => this.onTrainingProgramSelect(t.id)}
                      >
                        {t.name}
                      </List.Header>
                      <List.Description as="p">
                        {new Date(t.startDate).toLocaleDateString()} -{" "}
                        {new Date(t.endDate).toLocaleDateString()}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
        </List>
        <Modal
          open={modalOpen}
          size="mini"
          dimmer="inverted"
          closeIcon
          closeOnDimmerClick
          closeOnDocumentClick
        >
          <Modal.Header>
            {isAlreadyInProgram && "Un-"}Register Employee
          </Modal.Header>
          {selectedTraining && employee ? (
            <>
              {isAlreadyInProgram ? (
                <>
                  <Modal.Content>
                    <p>
                      {employee.firstName} is already registered for{" "}
                      <strong>{selectedTraining.name}</strong> on{" "}
                      {new Date(selectedTraining.startDate).toLocaleString()}.
                      Would you like to un-register this employee?
                    </p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      negative
                      onClick={() => this.setState({ modalOpen: false })}
                    >
                      No
                    </Button>
                    <Button
                      positive
                      onClick={this.unregisterProgram}
                      content="Yes"
                    />
                  </Modal.Actions>
                </>
              ) : (
                <>
                  <Modal.Content>
                    <p>
                      Would you like to register {employee.firstName} for{" "}
                      {selectedTraining.name} on{" "}
                      {new Date(selectedTraining.startDate).toLocaleString()}?
                    </p>
                    <strong>
                      {selectedTraining.maxAttendees -
                        selectedTraining.employees.length}{" "}
                      Spots Available
                    </strong>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      negative
                      onClick={() => this.setState({ modalOpen: false })}
                    >
                      No
                    </Button>
                    <Button positive onClick={this.registerProgram}>
                      Yes
                    </Button>
                  </Modal.Actions>
                </>
              )}
            </>
          ) : null}
        </Modal>
      </>
    );
  }
}
