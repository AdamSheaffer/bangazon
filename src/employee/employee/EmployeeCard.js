import React, { Component } from "react";
import EmployeeDetails from "./EmployeeDetails";
import { Card, Divider, Grid, Icon } from "semantic-ui-react";

export default class EmployeeCard extends Component {
  state = {
    cardVisible: false
  };

  employeeDetailsToggle = () => {
    this.props.selectEmployee(this.props.employee.id);
  };

  render() {
    return (
      <>
        <div className="cardContainer">
          <Card
            link
            fluid
            onClick={() => {
              this.employeeDetailsToggle();
            }}
          >
            <Card.Content>
              <Grid>
                <Grid.Row columns="equal">
                  <Grid.Column width={4}>
                    <Icon name="user circle" color="teal" size="massive" />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <h2>
                      {this.props.employee.firstName}{" "}
                      {this.props.employee.lastName}
                    </h2>
                    <p className="employee-card-label-item">
                      <strong>Email:</strong> {this.props.employee.email}
                    </p>
                    <p className="employee-card-label-item">
                      <strong>Department:</strong>{" "}
                      {this.props.employee.department &&
                        this.props.employee.department.name}
                    </p>
                  </Grid.Column>
                  <Grid.Column width={4} verticalAlign="middle" floated="right">
                    <Icon name="chevron right" size="huge" color="grey" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
          {this.state.cardVisible === true ? (
            <>
              <Card className="detailsCard">
                <EmployeeDetails
                  toggle={this.props.toggle}
                  employee={this.props.employee}
                  id={this.props.employee.id}
                />
              </Card>
            </>
          ) : null}
        </div>
      </>
    );
  }
}
