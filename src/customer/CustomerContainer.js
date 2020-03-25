import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import SideBar from "../nav/SideBar";
import PaymentTypesList from "./paymentTypes/PaymentTypesList";

export default class CustomerContainer extends Component {
  render() {
    return (
      <>
        <SideBar view="Customers" />
        <div className="containerDiv">
          <div className="portalDiv">
            <h4 className="viewManager">CUSTOMER MANAGER</h4>
            <Link to="/employee-portal/">
              <Button color="facebook">Go to Employee Portal</Button>
            </Link>
          </div>

          <Route
            exact
            path="/customer-portal/payment-types/"
            render={() => <PaymentTypesList />}
          />
        </div>
      </>
    );
  }
}
