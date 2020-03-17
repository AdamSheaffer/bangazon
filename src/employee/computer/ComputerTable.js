import React, { Component } from "react";
import ComputerEdit from "./ComputerEdit";
import ComputerAdd from "./ComputerAdd";
import APIManager from "../../api/APIManager";
import { Table, Button, Sidebar, Icon } from "semantic-ui-react";
import moment from "moment";
import "../../App.css";

export default class ComputerTable extends Component {
  state = {
    filter: "all",
    computers: [],
    storedComputer: {},
    visible: false,
    newSidebarState: this.props.sidebarState
  };

  componentDidMount() {
    APIManager.getAll("computers").then(response => {
      this.setState({
        computers: response
      });
    });
  }

  changeFilter = filter => {
    let request;
    switch (filter) {
      case "available":
        request = APIManager.getComputersByAvailability(true);
        break;
      case "unavailable":
        request = APIManager.getComputersByAvailability(false);
        break;
      default:
        request = APIManager.getAll("computers");
        break;
    }
    request.then(response => {
      this.setState({
        filter,
        computers: response
      });
    });
  };

  refresh = () => {
    this.changeFilter(this.state.filter);
  };

  handleOpen = computer =>
    this.setState({
      active: true,
      storedComputer: computer
    });

  handleClose = () => this.setState({ active: false });

  render() {
    const { active, filter } = this.state;
    const newActive = this.props.sidebarState;

    return (
      <>
        <Button.Group>
          <Button
            onClick={() => this.changeFilter("all")}
            color={filter === "all" ? "blue" : null}
          >
            All
          </Button>
          <Button
            onClick={() => this.changeFilter("available")}
            color={filter === "available" ? "blue" : null}
          >
            Available
          </Button>
          <Button
            onClick={() => this.changeFilter("unavailable")}
            color={filter === "unavailable" ? "blue" : null}
          >
            Unavailable
          </Button>
        </Button.Group>
        <Table size="small" celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Computer ID</Table.HeaderCell>
              <Table.HeaderCell>Computer Model</Table.HeaderCell>
              <Table.HeaderCell>Purchase Date</Table.HeaderCell>
              <Table.HeaderCell>Active Status</Table.HeaderCell>
              <Table.HeaderCell>Details</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {this.state.computers.map(computer => (
            <Table.Body key={computer.id}>
              <Table.Row>
                <Table.Cell>#{computer.id}</Table.Cell>
                <Table.Cell>
                  {computer.make} {computer.model}
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  {moment(computer.purchaseDate).format("MM/DD/YYYY")}
                </Table.Cell>
                <Table.Cell>
                  {!computer.decomissionDate ? "Active" : "Inactive"}
                </Table.Cell>
                <Table.Cell>
                  <Button basic onClick={() => this.handleOpen(computer)} icon>
                    <Icon name="pencil alternate" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        <Sidebar
          animation="push"
          icon="labeled"
          inverted="false"
          onHide={null}
          vertical="true"
          visible={active}
          width="wide"
          direction="right"
        >
          {active && this.state.storedComputer ? (
            <ComputerEdit
              closeSidebar={this.handleClose}
              refresh={this.refresh}
              computer={this.state.storedComputer}
            />
          ) : null}
        </Sidebar>
        <Sidebar
          animation="push"
          icon="labeled"
          inverted="false"
          onHide={null}
          vertical="false"
          visible={newActive}
          width="wide"
          direction="right"
        >
          <ComputerAdd
            closeSidebar={this.props.closeSidebar}
            refresh={this.refresh}
          />
        </Sidebar>
      </>
    );
  }
}
