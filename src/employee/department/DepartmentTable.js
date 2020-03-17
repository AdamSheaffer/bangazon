import React, { Component } from "react";
import DepartmentEdit from "./DepartmentEdit";
import DepartmentAdd from "./DepartmentAdd";
import APIManager from "../../api/APIManager";
import { notify } from "react-notify-toast";
import { Table, Button, Sidebar, Icon } from "semantic-ui-react";
import "../../App.css";

export default class ComputerTable extends Component {
  state = {
    departments: [],
    departmentToEdit: {},
    visible: false,
    newSidebarState: this.props.sidebarState
  };

  componentDidMount() {
    if (this.props.searchValue) {
      APIManager.getById("departments", this.props.searchValue)
        .then(response => {
          this.setState({
            departments: [response]
          });
        })
        .catch(err => {
          notify.show("There was an error getting department data", "error");
        });
    } else {
      APIManager.getAll("departments")
        .then(response => {
          this.setState({
            departments: response
          });
        })
        .catch(err => {
          notify.show("There was an error getting department data", "error");
        });
    }
  }

  refresh = () => {
    APIManager.getAll("departments").then(response => {
      this.setState({
        departments: response
      });
    });
  };

  handleOpen = department =>
    this.setState({
      active: true,
      departmentToEdit: department
    });

  handleClose = () => this.setState({ active: false });

  render() {
    const { active } = this.state;
    const newActive = this.props.sidebarState;
    return (
      <>
        <div>
          <Table size="small" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Department ID</Table.HeaderCell>
                <Table.HeaderCell>Department Name</Table.HeaderCell>
                <Table.HeaderCell>Budget</Table.HeaderCell>
                <Table.HeaderCell>Details</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {this.state.departments.map(department => (
              <Table.Body key={department.id}>
                <Table.Row>
                  <Table.Cell width="1">#{department.id}</Table.Cell>
                  <Table.Cell width="2">{department.name}</Table.Cell>
                  <Table.Cell width="2">
                    ${department.budget.toLocaleString()}
                  </Table.Cell>
                  <Table.Cell width="1">
                    <Button
                      basic
                      onClick={() => this.handleOpen(department)}
                      icon
                    >
                      <Icon name="pencil alternate" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
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
          {active ? (
            <DepartmentEdit
              closeSidebar={this.handleClose}
              refresh={this.refresh}
              department={this.state.departmentToEdit}
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
          <DepartmentAdd
            closeSidebar={this.props.closeSidebar}
            refresh={this.refresh}
          />
        </Sidebar>
      </>
    );
  }
}
