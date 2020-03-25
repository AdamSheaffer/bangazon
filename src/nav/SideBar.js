import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Menu, Sidebar } from "semantic-ui-react";

class SideBar extends Component {
  state = {
    activeItem: ""
  };

  employeeOptions = [
    {
      title: "DASHBOARD",
      link: "/employee-portal/"
    },
    {
      title: "COMPUTERS",
      link: "/employee-portal/computers/"
    },
    {
      title: "DEPARTMENTS",
      link: "/employee-portal/departments/"
    },
    {
      title: "EMPLOYEES",
      link: "/employee-portal/employees/"
    },
    {
      title: "TRAINING",
      link: "/employee-portal/training/"
    }
  ];

  customerOptions = [
    {
      title: "CUSTOMERS",
      link: "/customer-portal/customers"
    },
    {
      title: "PRODUCTS",
      link: "/customer-portal/products"
    },
    {
      title: "ORDERS",
      link: "/customer-portal/orders"
    },
    {
      title: "PAYMENTS",
      link: "/customer-portal/payment-types"
    }
  ];
  handleItemClick = (e, { name, url }) => {
    this.setState({ activeItem: name });
    this.props.history.push(url);
  };

  render() {
    const { activeItem } = this.state;

    const items =
      this.props.view === "Employees"
        ? this.employeeOptions
        : this.customerOptions;

    return (
      <>
        <Sidebar as={Menu} pointing size="tiny" vertical visible>
          <Link to="/">
            <img
              src={require("../images/B-Logo.png")}
              alt="bangazon logo"
              className="bangazonLogo"
            />
          </Link>
          {items.map(option => (
            <Menu.Item
              key={option.link}
              name={option.title}
              url={option.link}
              active={activeItem === option.title}
              onClick={this.handleItemClick}
            />
          ))}
        </Sidebar>
      </>
    );
  }
}
export default withRouter(SideBar);
