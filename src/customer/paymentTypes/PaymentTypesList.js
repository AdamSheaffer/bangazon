import React, { Component } from "react";
import {
  Table,
  Grid,
  Sidebar,
  Button,
  Checkbox,
  Icon
} from "semantic-ui-react";
import { notify } from "react-notify-toast";
import PaymentTypeAdd from "./PaymentTypeAdd";
import APIManager from "../../api/APIManager";

export default class PaymentTypesList extends Component {
  state = {
    paymentTypes: [],
    showSidebar: false
  };

  componentDidMount() {
    this.getPaymentTypes();
  }

  getPaymentTypes = () => {
    return APIManager.getAll("paymentTypes").then(paymentTypes => {
      this.setState({ paymentTypes });
    });
  };

  openAddForm = () => {
    this.setState({ showSidebar: true });
  };

  closeAddForm = () => {
    this.setState({ showSidebar: false });
  };

  save = newType => {
    APIManager.addData("paymentTypes", newType)
      .then(this.getPaymentTypes)
      .then(this.closeAddForm);
  };

  removeType = paymentType => {
    APIManager.deleteData("paymentTypes", paymentType.id)
      .then(this.getPaymentTypes)
      .catch(_err => {
        notify.show("There was an error updating the payment type", "error");
      });
  };

  render() {
    const { paymentTypes, showSidebar } = this.state;
    return (
      <>
        <Sidebar
          animation="overlay"
          direction="right"
          visible={showSidebar}
          width="wide"
        >
          <PaymentTypeAdd onCancel={this.closeAddForm} onSubmit={this.save} />
        </Sidebar>

        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column>
              <h1 className="viewHeader">Payment Types</h1>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button
                content="Add Payment Option"
                onClick={this.openAddForm}
                color="orange"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid verticalAlign="middle" stretched>
          <Grid.Row columns="equal">
            <Grid.Column>
              <Table size="large" striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Remove</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {paymentTypes.map(type => (
                    <Table.Row key={type.id}>
                      <Table.Cell>#{type.id}</Table.Cell>
                      <Table.Cell>{type.name}</Table.Cell>
                      <Table.Cell>
                        <Button
                          icon
                          color="red"
                          basic
                          title="Remove"
                          onClick={() => this.removeType(type)}
                        >
                          <Icon name="trash alternate" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column>
              <div className="dashboard__img-container">
                <img
                  src={require("../../images/Deals.png")}
                  alt="welcome flag"
                  className="payment-types__img"
                ></img>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }
}
