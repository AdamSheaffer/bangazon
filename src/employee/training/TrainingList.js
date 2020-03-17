import React, { Component } from "react";
import APIManager from "../../api/APIManager";
import TrainingAdd from "./TrainingAdd";
import TrainingEdit from "./TrainingEdit";
import { withRouter } from "react-router-dom";
import { Sidebar, Table, Button, Icon, Modal } from "semantic-ui-react";
import { notify } from "react-notify-toast";

class TrainingList extends Component {
  state = {
    trainings: [],
    trainingPendingDelete: null,
    trainingToEdit: null
  };

  refresh = () => {
    APIManager.getAll("trainingPrograms")
      .then(response => {
        this.setState({
          trainings: response
        });
      })
      .catch(err => {
        notify.show("There was an error getting training programs", "error");
      });
  };

  removeTraining = () => {
    APIManager.removeTrainingProgram(this.state.trainingPendingDelete.id)
      .then(() => APIManager.getAll("trainingPrograms"))
      .then(response => {
        this.setState({
          trainings: response,
          trainingPendingDelete: null
        });
      })
      .catch(err => {
        notify.show(
          "There was an error removing the training program",
          "error"
        );
      });
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    if (!this.props.searchValue) {
      APIManager.getAll("trainingPrograms")
        .then(response => {
          this.setState({
            trainings: response
          });
        })
        .catch(err => {
          notify.show("There was an error getting training programs", "error");
        });
    } else
      APIManager.getById("trainingPrograms", this.props.searchValue)
        .then(response => {
          this.setState({
            trainings: [response]
          });
        })
        .catch(err => {
          notify.show("There was an error getting training programs", "error");
        });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.loadData();
    }
  }
  render() {
    const newActive = this.props.sidebarState;
    return (
      <>
        <Table size="small" celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Program Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Dates</Table.HeaderCell>
              <Table.HeaderCell>Total Slots</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.trainings.map(t => (
              <Table.Row key={t.id}>
                <Table.Cell>#{t.id}</Table.Cell>
                <Table.Cell>{t.name}</Table.Cell>
                <Table.Cell>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric"
                  }).format(new Date(t.startDate))}{" "}
                  {" - "}
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric"
                  }).format(new Date(t.endDate))}
                </Table.Cell>
                <Table.Cell>{t.maxAttendees}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => this.setState({ trainingToEdit: t })}
                    basic
                    icon
                  >
                    <Icon name="pencil alternate" />
                  </Button>
                  <Button
                    basic
                    icon
                    negative
                    onClick={() => this.setState({ trainingPendingDelete: t })}
                  >
                    <Icon name="trash alternate" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Sidebar
          animation="push"
          icon="labeled"
          inverted="false"
          onHide={null}
          vertical="false"
          visible={newActive || !!this.state.trainingToEdit}
          width="wide"
          direction="right"
        >
          {this.state.trainingToEdit ? (
            <TrainingEdit
              training={this.state.trainingToEdit}
              onSuccess={() => {
                this.refresh();
                this.props.closeSidebar();
                this.setState({ trainingToEdit: null });
              }}
              onCancel={() => {
                this.props.closeSidebar();
                this.setState({ trainingToEdit: null });
              }}
            />
          ) : (
            <TrainingAdd
              refresh={() => this.refresh()}
              closeSidebar={this.props.closeSidebar}
            />
          )}
        </Sidebar>

        <Modal
          dimmer="inverted"
          size="mini"
          open={!!this.state.trainingPendingDelete}
          onClose={() => this.setState({ trainingPendingDelete: null })}
        >
          {!!this.state.trainingPendingDelete && (
            <>
              <Modal.Header>
                Delete {this.state.trainingPendingDelete.name}?
              </Modal.Header>
              <Modal.Content>
                <p>Are you sure you want to remove this training program?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={this.removeTraining} color="orange">
                  Remove Program
                </Button>
                <Button
                  basic
                  onClick={() => this.setState({ trainingPendingDelete: null })}
                  color="orange"
                  content="Go Back"
                />
              </Modal.Actions>
            </>
          )}
        </Modal>
      </>
    );
  }
}

export default withRouter(TrainingList);
