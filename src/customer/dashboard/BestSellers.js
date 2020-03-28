import React, { Component } from "react";
import { Card, Divider, List, Icon } from "semantic-ui-react";
import { notify } from "react-notify-toast";
import APIManager from "../../api/APIManager";

export default class BestSellers extends Component {
  state = {
    products: [],
    productTypes: []
  };

  componentDidMount() {
    APIManager.getAll("productTypes")
      .then(productTypes => {
        this.setState({ productTypes });
      })
      .then(() => {
        APIManager.sortProductsBy("popularity")
          .then(p => {
            const products = p.slice(0, 3).map(prod => {
              prod.productType = this.state.productTypes.find(
                pt => pt.id === prod.productTypeId
              );
              return prod;
            });
            this.setState({ products: products });
          })
          .catch(_err => {
            notify.show("There was an error getting products", "error");
          });
      })
      .catch(_err => {
        notify.show("There was an error getting product types", "error");
      });
  }

  render() {
    const { products } = this.state;
    return (
      <Card fluid>
        <Card.Content>
          <h3 className="department-card__header">BEST SELLERS</h3>
          <Divider />
          <List relaxed divided>
            {products.map(p => (
              <List.Item key={p.id}>
                <Icon name="shopping cart" color="teal" size="big" />
                <List.Content>
                  <List.Header as="a">{p.title}</List.Header>
                  <List.Description>
                    <strong>Category:</strong> {p.productType.name}
                  </List.Description>
                  <List.Description>
                    <strong>Added:</strong>{" "}
                    {new Date(p.dateAdded).toLocaleDateString()}
                  </List.Description>
                  <List.Description>
                    <strong>Price:</strong> ${p.price}
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
