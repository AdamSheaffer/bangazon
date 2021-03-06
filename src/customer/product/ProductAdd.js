import React, { Component } from "react";
import APIManager from "../../api/APIManager";
import { Button, Form, Header, Dropdown } from "semantic-ui-react";
import { notify } from "react-notify-toast";

export default class ProductAdd extends Component {
  state = {
    title: "",
    description: "",
    price: "",
    productTypeId: "",
    productTypes: []
  };

  componentDidMount() {
    APIManager.getAll("productTypes")
      .then(productTypes => {
        const options = productTypes.map(p => {
          return {
            text: p.name,
            value: p.id
          };
        });
        this.setState({ productTypes: options });
      })
      .catch(_err => {
        notify.show("There was an error getting product types", "error");
      });
  }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  addProduct = evt => {
    evt.preventDefault();

    const { title, description, price, productTypeId } = this.state;
    const product = {
      title,
      description,
      price,
      productTypeId,
      customerId: +this.props.customerId
    };

    return APIManager.addData("products", product)
      .then(() => {
        this.props.onSave();
      })
      .catch(_err => {
        notify.show("There was an error saving the product", "error");
      });
  };

  render() {
    return (
      <>
        <Form>
          <div className="purpleHeader">
            <Header as="h1" textAlign="center" className="addSlideBarHeader">
              Create Product Listing
            </Header>
          </div>
          <div className="slideBarImg">
            <img
              src={require("../../images/Shopping-Cart.png")}
              alt="Computer"
              className="computerImage"
            />
          </div>
          <div className="fifteen wide field">
            <label>Product Name</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.title}
              id="title"
            />
          </div>
          <div className="fifteen wide field">
            <label>Price</label>
            <input
              onChange={this.handleFieldChange}
              value={this.state.price}
              id="price"
            />
          </div>
          <div className="fifteen wide field">
            <label>Category</label>
            <Dropdown
              selection
              options={this.state.productTypes}
              placeholder="Select Category"
              onChange={(e, { value }) =>
                this.setState({ productTypeId: value })
              }
              value={this.state.productTypeId}
            />
          </div>
          <div className="fifteen wide field">
            <label>Description</label>
            <textarea
              onChange={this.handleFieldChange}
              placeholder="About this product"
              value={this.state.description}
              id="description"
            />
          </div>
          <div className="slideBarButtonContainer">
            <Button
              type="submit"
              color="orange"
              onClick={evt => this.addProduct(evt)}
            >
              Create Product Listing
            </Button>
            <Button
              basic
              color="orange"
              content="Cancel"
              onClick={this.props.onCancel}
            />
          </div>
        </Form>
      </>
    );
  }
}
