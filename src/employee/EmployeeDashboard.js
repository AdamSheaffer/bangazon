import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import DepartmentDashboardCard from "./DepartmentDashboardCard";
import TrainingDashboardCard from "./TrainingDashboardCard";
import EmployeeDashboardCard from "./EmployeeDashboardCard";
import ComputerDashboardCard from "./ComputerDashboardCard";

export default class EmployeeDashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column width={10}>
              <DepartmentDashboardCard />
            </Grid.Column>
            <Grid.Column width={6}>
              <div className="dashboard__img-container">
                <img
                  src={require("../images/Welcome.png")}
                  alt="welcome flag"
                  className="dashboard__img"
                ></img>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width={4}>
              <TrainingDashboardCard />
            </Grid.Column>
            <Grid.Column width={4}>
              <EmployeeDashboardCard />
            </Grid.Column>
            <Grid.Column width={8}>
              <ComputerDashboardCard />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
