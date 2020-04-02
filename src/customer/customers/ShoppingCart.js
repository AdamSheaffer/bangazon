import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Table, Card, Button, Dropdown, Grid, Form } from "semantic-ui-react";

class ShoppingCart extends Component {
  state = {
    selectedPaymentOption: null,
    productId: ""
  };

  submit = e => {
    e.preventDefault();
    if (this.state.productId) {
      this.props.addProduct(this.state.productId).then(() => {
        this.setState({ productId: "" });
      });
    }
  };

  render() {
    const { selectedPaymentOption } = this.state;
    const { cart, paymentOptions } = this.props;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    return (
      <Card fluid>
        <Card.Content>
          <h3 className="department-card__header">SHOPPING CART</h3>
          <Form onSubmit={this.submit}>
            <Form.Field inline>
              <label>Add Product</label>
              <input
                value={this.state.productId}
                onChange={e => this.setState({ productId: e.target.value })}
                placeholder="Product ID"
              />
            </Form.Field>
            <Button
              disabled={!this.state.productId}
              content="Add"
              color="facebook"
            />
          </Form>
          {!cart || !cart.products ? (
            <h5>
              <em>No items in cart</em>
            </h5>
          ) : (
            <Table striped size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {cart.products.map((product, i) => (
                  <Table.Row key={i}>
                    <Table.Cell>{product.title}</Table.Cell>
                    <Table.Cell>{formatter.format(product.price)}</Table.Cell>
                    <Table.Cell>
                      <Button
                        onClick={() => this.props.remove(product.id)}
                        basic
                        color="red"
                        icon="trash alternate"
                        title="Remove"
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
          {cart && cart.products && (
            <>
              <h5>
                Total:{" "}
                {formatter.format(
                  cart.products.reduce((t, p) => t + p.price, 0)
                )}
              </h5>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Dropdown
                      selection
                      options={paymentOptions}
                      placeholder="Payment Option"
                      onChange={(e, { value }) =>
                        this.setState({ selectedPaymentOption: value })
                      }
                      value={selectedPaymentOption}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Button
                      color="orange"
                      content="Checkout"
                      onClick={() =>
                        this.props.purchase(this.state.selectedPaymentOption)
                      }
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </>
          )}
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(ShoppingCart);
