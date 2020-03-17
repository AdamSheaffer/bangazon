import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Divider, Header, Icon } from "semantic-ui-react";
import { Doughnut } from "react-chartjs-2";
import APIManager from "../api/APIManager";
import { notify } from "react-notify-toast";

const chartColors = [
  "rgba(87, 202, 219, .9)",
  "rgba(163, 213, 172, .9)",
  "rgba(227, 147, 175, .9)",
  "rgba(181, 166, 239, .9)",
  "rgba(255, 171, 125, .9)",
  "rgba(181, 204, 24, .9)",
  "rgba(87, 202, 219, .5)",
  "rgba(163, 213, 172, .5)",
  "rgba(227, 147, 175, .5)",
  "rgba(181, 166, 239, .5)",
  "rgba(255, 171, 125, .5)",
  "rgba(181, 204, 24, .5)"
];

export default class DepartmentDashboardCard extends Component {
  state = {
    departments: [],
    chartData: {},
    totalBudgetDisplay: null
  };

  componentDidMount() {
    APIManager.getAll("departments")
      .then(departments => {
        const chartData = {
          labels: departments.map(d => d.name),
          datasets: [
            {
              label: "Budget",
              data: departments.map(d => d.budget),
              backgroundColor: chartColors
            }
          ]
        };
        const totalBudget = departments.reduce((p, c) => p + c.budget, 0);
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        });
        const totalBudgetDisplay = formatter.format(totalBudget);
        this.setState({ departments, chartData, totalBudgetDisplay });
      })
      .catch(err => {
        notify.show("There was an error getting department data", "error");
      });
  }

  render() {
    const { departments, chartData, totalBudgetDisplay } = this.state;
    return (
      <Card fluid>
        <Card.Content>
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column width={6}>
                <h3 className="department-card__header">DEPARTMENTS</h3>
                <p className="department-card__subheader">
                  Total # of Departments
                </p>
                <h4 className="department-card__header">
                  {departments.length || null}
                </h4>
                <Divider />
                <p className="department-card__subheader">
                  Total Company Budget
                </p>
                <h4 className="department-card__header">
                  {totalBudgetDisplay}
                </h4>
              </Grid.Column>
              <Grid.Column width={10}>
                <Doughnut
                  height={250}
                  data={chartData}
                  options={{ maintainAspectRatio: false }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Header textAlign="right">
            <Link to="/employee-portal/departments">
              More
              <Icon name="arrow right" />
            </Link>
          </Header>
        </Card.Content>
      </Card>
    );
  }
}
