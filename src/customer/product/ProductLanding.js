import React, { Component } from "react";
import {
  Grid,
  Input,
  Dropdown,
  Header,
  Radio,
  Container,
  Form,
  Table
} from "semantic-ui-react";
import { notify } from "react-notify-toast";
import APIManager from "../../api/APIManager";
import { Link } from "react-router-dom";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export default class ProductLanding extends Component {
  state = {
    products: [],
    productTypes: [],
    searchTerm: "",
    selectedProductType: null,
    searchBy: "type"
  };

  handleSearchByChange = searchBy => {
    this.setState({ searchBy });

    if (searchBy === "type") {
      APIManager.getDataWithProduct(
        "productTypes",
        this.state.selectedProductType
      ).then(pt => {
        this.setState({ products: pt.products });
      });
    }
  };

  search = event => {
    APIManager.searchByName("products", event.target.value)
      .then(products => {
        this.setState({ products });
      })
      .catch(_err => {
        notify.show("There was an error gettings products", "error");
      });
  };

  filterByProductType = type => {
    this.setState({ selectedProductType: type });
    APIManager.getDataWithProduct("productTypes", type).then(pt => {
      this.setState({ products: pt.products });
    });
  };

  componentDidMount() {
    let typeOptions;
    let defaultType;
    APIManager.getAll("productTypes")
      .then(productTypes => {
        defaultType = productTypes[0].id;
        typeOptions = productTypes.map(t => {
          return {
            text: t.name,
            value: t.id
          };
        });
        return APIManager.getDataWithProduct("productTypes", defaultType);
      })
      .then(pt => {
        this.setState({
          products: pt.products,
          productTypes: typeOptions,
          selectedProductType: defaultType
        });
      })
      .catch(_err => {
        notify.show("There was an error getting product types", "error");
      });
  }

  render() {
    return (
      <>
        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column>
              <h1 className="viewHeader">Products</h1>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Form
                onSubmit={this.search}
                style={{
                  display: "inline-block"
                }}
              >
                {this.state.searchBy === "name" && (
                  <Input
                    size="large"
                    icon={{ name: "search", link: true }}
                    type="text"
                    onChange={this.search}
                    placeholder="Search Products"
                  />
                )}
                {this.state.searchBy === "type" && (
                  <Dropdown
                    onChange={(e, { value }) => this.filterByProductType(value)}
                    selection
                    value={this.state.selectedProductType}
                    options={this.state.productTypes}
                  />
                )}
              </Form>
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
                  this.state.searchBy === "type"
                    ? "search-by__radio search-by__radio--selected"
                    : "search-by__radio"
                }
                label="Product Type"
                name="radioGroup"
                value="type"
                checked={this.state.searchBy === "type"}
                onChange={() => this.handleSearchByChange("type")}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column width={10}>
              {!!this.state.products.length ? (
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={4}>Product ID</Table.HeaderCell>
                      <Table.HeaderCell width={6}>Name</Table.HeaderCell>
                      <Table.HeaderCell width={3}>Price</Table.HeaderCell>
                      <Table.HeaderCell width={3}></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.state.products.map(p => (
                      <Table.Row key={p.id}>
                        <Table.Cell width={4}>#{p.id}</Table.Cell>
                        <Table.Cell width={6}>{p.title}</Table.Cell>
                        <Table.Cell width={3}>
                          {currencyFormatter.format(p.price)}
                        </Table.Cell>
                        <Table.Cell width={3}>
                          <Link
                            to={"/customer-portal/customers/" + p.customerId}
                          >
                            Seller
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              ) : (
                <Container textAlign="center">
                  <img
                    src={require("../../images/Empty-State-Charts.png")}
                    className="employeeSearchImg"
                    alt="magnifying glass"
                  />
                  <Header color="grey" as="h2">
                    No Products Found
                  </Header>
                </Container>
              )}
            </Grid.Column>
            <Grid.Column width={6}>
              <div className="dashboard__img-container">
                <img
                  src={require("../../images/Successful-Shopping-Bag.png")}
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
