import React, { Component } from "react";
import {
  Grid,
  Input,
  Button,
  Header,
  Radio,
  Container,
  Form,
  Sidebar
} from "semantic-ui-react";
import { notify } from "react-notify-toast";
import APIManager from "../../api/APIManager";
import CustomerSearchResults from "./CustomerSearchResults";
import CustomerAdd from "./CustomerAdd";

export default class CustomerLanding extends Component {
  state = {
    searchBy: "name",
    searchTerm: "",
    queryMade: false,
    customers: [],
    showSidebar: false
  };

  handleSearchByChange = searchBy => {
    this.setState({ searchBy });
  };

  search = () => {
    const { searchBy, searchTerm } = this.state;
    if (searchBy === "name") {
      APIManager.searchByName("customers", searchTerm)
        .then(customers => {
          this.setState({ customers, queryMade: true });
        })
        .catch(_err => {
          notify.show("There was an error gettings customers", "error");
        });
    } else if (searchBy === "id") {
      APIManager.getById("customers", searchTerm)
        .then(customer => {
          const customers = Array.isArray(customer) ? customer : [customer];
          this.setState({
            customers,
            queryMade: true
          });
        })
        .catch(err => {
          this.setState({ customers: [], queryMade: true });
        });
    }
  };

  openSidebar = () => {
    this.setState({ showSidebar: true });
  };

  closeSidebar = () => {
    this.setState({ showSidebar: false });
  };

  save = customer => {
    APIManager.addData("customers", customer)
      .then(this.closeSidebar)
      .then(this.search);
  };

  render() {
    const placeholder =
      this.state.searchBy === "id" ? "Search by ID" : "Search by Name";
    return (
      <>
        <Sidebar
          animation="overlay"
          direction="right"
          visible={this.state.showSidebar}
          width="wide"
        >
          <CustomerAdd onCancel={this.closeSidebar} onSubmit={this.save} />
        </Sidebar>
        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column>
              <h1 className="viewHeader">Customers</h1>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Form
                onSubmit={this.search}
                style={{
                  display: "inline-block"
                }}
              >
                <Input
                  size="large"
                  icon={{ name: "search", link: true }}
                  type="text"
                  onChange={e => this.setState({ searchTerm: e.target.value })}
                  placeholder={placeholder}
                />
              </Form>
              <Button
                className="buttonContainer"
                content="Add Customer"
                color="orange"
                onClick={this.openSidebar}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={16}>
            <Grid.Column width={16} textAlign="right">
              <Header color="grey" as="span">
                Search By:{" "}
              </Header>

              <Radio
                className={
                  this.state.searchBy === "name"
                    ? "search-by__radio search-by__radio--selected"
                    : "search-by__radio"
                }
                label="Name"
                name="radioGroup"
                value="name"
                checked={this.state.searchBy === "name"}
                onChange={() => this.handleSearchByChange("name")}
              />

              <Radio
                className={
                  this.state.searchBy === "id"
                    ? "search-by__radio search-by__radio--selected"
                    : "search-by__radio"
                }
                label="Customer ID"
                name="radioGroup"
                value="id"
                checked={this.state.searchBy === "id"}
                onChange={() => this.handleSearchByChange("id")}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {!!this.state.customers.length ? (
          <CustomerSearchResults customers={this.state.customers} />
        ) : (
          <Container textAlign="center">
            <img
              src={require("../../images/Empty-State-Charts.png")}
              className="employeeSearchImg"
              alt="magnifying glass"
            />
            <Header color="grey" as="h2">
              {this.state.searchTerm && this.state.queryMade
                ? "No matches found"
                : "Search Customers"}
            </Header>
          </Container>
        )}
      </>
    );
  }
}
