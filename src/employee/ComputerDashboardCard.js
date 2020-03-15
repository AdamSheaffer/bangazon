import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Header, Table, Icon } from "semantic-ui-react";
import APIManager from "../api/APIManager";

export default class ComputerDashboardCard extends Component {
  state = {
    computers: []
  };

  componentDidMount() {
    APIManager.getComputersByAvailability(true).then(data => {
      const computers = data.slice(0, 5).map(c => {
        return {
          id: c.id,
          make: c.make,
          model: c.model
        };
      });
      this.setState({
        computers
      });
    });
  }

  render() {
    const { computers } = this.state;
    return (
      <Card fluid>
        <Card.Content>
          <h3 className="department-card__header">COMPUTERS</h3>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>COMPUTER ID</Table.HeaderCell>
                <Table.HeaderCell>MAKE AND MODEL</Table.HeaderCell>
                <Table.HeaderCell>STATUS</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {computers.map(c => (
                <Table.Row key={c.id}>
                  <Table.Cell>#{c.id}</Table.Cell>
                  <Table.Cell>
                    <strong>
                      {c.make} {c.model}
                    </strong>
                  </Table.Cell>
                  <Table.Cell>AVAILABLE</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <Header textAlign="right">
            <Link to="/employee-portal/computers/">
              More
              <Icon name="arrow right" />
            </Link>
          </Header>
        </Card.Content>
      </Card>
    );
  }
}
