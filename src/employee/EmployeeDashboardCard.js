import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Header, Icon, List, Divider } from "semantic-ui-react";
import APIManager from "../api/APIManager";

export default class EmployeeDashboardCard extends Component {
  state = {
    employees: [],
    totalCount: null
  };

  componentDidMount() {
    APIManager.getAll("employees").then(data => {
      const totalCount = data.length;
      const employees = data.slice(totalCount - 3, totalCount).map(e => {
        return {
          id: e.id,
          name: `${e.firstName} ${e.lastName}`,
          email: e.email
        };
      });
      this.setState({
        employees,
        totalCount
      });
    });
  }

  render() {
    const { employees, totalCount } = this.state;
    return (
      <Card fluid>
        <Card.Content>
          <h3 className="department-card__header">EMPLOYEES</h3>
          <h3>Total # Employees: {totalCount}</h3>
          <Divider />
          <h3>Recently Added Employees</h3>
          <List relaxed>
            {employees.map(e => (
              <List.Item key={e.id}>
                <Icon name="user circle" size="big" />
                <List.Content>
                  <List.Header as="a">{e.name}</List.Header>
                  <List.Description>{e.email}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
          <Header textAlign="right">
            <Link to="/employee-portal/employees/">
              More
              <Icon name="arrow right" />
            </Link>
          </Header>
        </Card.Content>
      </Card>
    );
  }
}
