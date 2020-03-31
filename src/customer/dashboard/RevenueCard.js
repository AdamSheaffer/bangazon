import React, { Component } from "react";
import { Card, Grid, Divider, List } from "semantic-ui-react";
import { Doughnut } from "react-chartjs-2";
import { notify } from "react-notify-toast";
import APIManager from "../../api/APIManager";

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

export default class RevenueCard extends Component {
  state = {
    chartData: {},
    reports: []
  };

  componentDidMount() {
    APIManager.getAll("revenueReport")
      .then(reports => {
        const chartData = {
          labels: reports.map(d => d.productType),
          datasets: [
            {
              label: "Revenue",
              data: reports.map(d => d.totalRevenue),
              backgroundColor: chartColors
            }
          ]
        };
        this.setState({ chartData, reports });
      })
      .catch(_err => {
        notify.show("There was an error retreving revenue data", "error");
      });
  }

  render() {
    const { chartData, reports } = this.state;
    const totalRevenue = reports.reduce((rev, r) => rev + r.totalRevenue, 0);
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    const totalRevenueDisplay = formatter.format(totalRevenue);
    const topCategories = reports
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 3);

    return (
      <Card fluid>
        <Card.Content>
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column width={6}>
                <h3 className="department-card__header">PRODUCT CATEGORIES</h3>
                <p className="department-card__subheader">Total Revenue</p>
                <h4 className="department-card__header">
                  {totalRevenueDisplay}
                </h4>
                <Divider />
                <p className="department-card__subheader">
                  Top Selling Categories
                </p>
                <List divided size="medium" relaxed>
                  {topCategories.map((t, i) => (
                    <List.Item key={t.productTypeId}>
                      <List.Icon name="tags" color="teal" size="large" />
                      <List.Content>
                        {`${i + 1}. ${t.productType} (${formatter.format(
                          t.totalRevenue
                        )})`}
                      </List.Content>
                    </List.Item>
                  ))}
                </List>
              </Grid.Column>
              <Grid.Column>
                <Doughnut
                  height={250}
                  data={chartData}
                  options={{ maintainAspectRatio: false }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}
