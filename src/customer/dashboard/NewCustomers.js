import React, { Component } from "react";
import { Card, Divider, List, Icon } from "semantic-ui-react";
import { notify } from "react-notify-toast";
import APIManager from "../../api/APIManager";

export default class NewCustomers extends Component {
  state = {
    customers: []
  };

  componentDidMount() {
    APIManager.getAll("customers")
      .then(customers => {
        const newCustomers = customers
          .sort((a, b) => {
            return new Date(b) - new Date(a);
          })
          .slice(0, 3);
        this.setState({ customers: newCustomers });
      })
      .catch(_err => {
        notify.show("There was an error getting customers", "error");
      });
  }

  render() {
    const { customers } = this.state;
    return (
      <Card fluid>
        <Card.Content>
          <h3 className="department-card__header">NEW CUSTOMERS</h3>
          <h3>Recently added buyers/sellers</h3>
          <Divider />
          <List relaxed divided>
            {customers.map(c => (
              <List.Item key={c.id}>
                <Icon name="user circle outline" color="teal" size="big" />
                <List.Content>
                  <List.Header as="a">
                    {c.firstName + " " + c.lastName}
                  </List.Header>
                  <List.Description>
                    <strong>Added:</strong>{" "}
                    {new Date(c.createdDate).toLocaleDateString()}
                  </List.Description>
                  <List.Description>
                    <strong>Location:</strong> {c.state}
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Card.Content>
      </Card>
    );
  }
}
