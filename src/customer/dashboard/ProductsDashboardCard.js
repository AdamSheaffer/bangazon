import React, { Component } from "react";
import { Card, Divider, List, Icon, Header } from "semantic-ui-react";
import { notify } from "react-notify-toast";
import APIManager from "../../api/APIManager";

export default class ProductsDashboardCard extends Component {
  state = {
    sortAsc: false,
    products: []
  };

  componentDidMount() {
    this.getProdcutsByPrice();
  }

  getProdcutsByPrice = () => {
    APIManager.sortProductsByPrice(this.state.sortAsc)
      .then(products => {
        const prods = products.slice(0, 3);
        this.setState({ products: prods });
      })
      .catch(_err => {
        notify.show("There was an error getting products", "error");
      });
  };

  toggleSort = () => {
    const newSort = !this.state.sortAsc;
    this.setState({ sortAsc: newSort }, this.getProdcutsByPrice);
  };

  render() {
    const { products, sortAsc } = this.state;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    return (
      <Card fluid>
        <Card.Content>
          <h3 className="department-card__header">
            {sortAsc ? "LEAST" : "MOST"} EXPENSIVE LISTINGS
          </h3>
          <Header
            as="a"
            content={sortAsc ? "show most expensive" : "show least expensive"}
            color="blue"
            onClick={this.toggleSort}
          />
          <Divider />
          <List relaxed divided>
            {products.map(p => (
              <List.Item key={p.id}>
                <Icon
                  name="dollar sign"
                  color={sortAsc ? "orange" : "green"}
                  size="big"
                />
                <List.Content>
                  <List.Header as="a">{p.title}</List.Header>
                  <List.Description>
                    <strong>Price:</strong>
                    {formatter.format(p.price)}
                  </List.Description>
                  <List.Description>
                    <strong>Added:</strong>{" "}
                    {new Date(p.dateAdded).toLocaleDateString()}
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
