import React, { Component } from "react";
import EmployeeEdit from "./EmployeeEdit";
import TrainingAssignment from "../training/TrainingAssignment";
import { List, Button, Icon, Sidebar, Divider } from "semantic-ui-react";

export default class EmployeeDetails extends Component {
  state = {
    visible: false
  };

  handleOpen = () => this.setState({ active: true });
  handleClose = () => this.setState({ active: false });

  render() {
    const { active } = this.state;
    return (
      <>
        <List relaxed>
          <div className="detailsCardFlexRow">
            <List.Item>
              <List.Content>
                <div className="detailsCardImage">
                  <img
                    src={require("../../images/Card-Ribbon.png")}
                    className="cardRibbon"
                    alt="Ribbon"
                  ></img>
                </div>
              </List.Content>
            </List.Item>
            <div className="detailsCardInfo">
              <List.Item className="headerButtonContainer">
                <div className="cardHeader">
                  <List.Content>
                    <h2 className="detailsEmployeeName">
                      {this.props.employee.firstName}{" "}
                      {this.props.employee.lastName}
                    </h2>
                  </List.Content>
                </div>
                <div className="cardEditButton">
                  <Button onClick={this.handleOpen} size="tiny" icon>
                    <Icon name="pencil alternate" />
                  </Button>
                </div>
              </List.Item>
              <div className="cardContent">
                <List.Item>
                  <List.Content>
                    <h5>Employee ID No: {this.props.employee.id}</h5>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <h5>
                      Computer ID No: {this.props.employee.computerId || "None"}
                    </h5>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <h5>
                      Computer Assigned:{" "}
                      {this.props.employee.computer
                        ? this.props.employee.computer.make +
                          " " +
                          this.props.employee.computer.model
                        : "None"}
                    </h5>
                  </List.Content>
                  <br></br>
                </List.Item>
                <List.Item>
                  <List.Icon name="mail" />
                  <List.Content>
                    <a href="mailto:">{this.props.employee.email}</a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>
                    Department Supervisor:{" "}
                    {this.props.employee.isSupervisor ? "Yes" : "No"}
                  </List.Content>
                </List.Item>

                <Divider></Divider>
                <List.Item>
                  <List.Content>
                    {" "}
                    <h4>All Upcoming Training Programs</h4>
                    <TrainingAssignment employee={this.props.employee} />
                  </List.Content>
                </List.Item>
              </div>
            </div>
          </div>
        </List>
        <Sidebar
          animation="push"
          icon="labeled"
          onHide={null}
          vertical="true"
          visible={active}
          width="wide"
          direction="right"
        >
          {active ? (
            <EmployeeEdit
              onUpdate={this.props.onEmployeeUpdate}
              closeSidebar={this.handleClose}
              employee={this.props.employee}
              id={this.props.employee.id}
            />
          ) : null}
        </Sidebar>
      </>
    );
  }
}
