import React from "react";
import { Link, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Button } from "semantic-ui-react";

const routeData = [
  {
    route: "/employee-portal/employees/",
    pageTitle: "Employees",
    buttonText: "Add an Employee"
  },
  {
    route: "/employee-portal/computers/",
    pageTitle: "Computers",
    buttonText: "Add a Computer"
  },
  {
    route: "/employee-portal/departments/",
    pageTitle: "Departments",
    buttonText: "Add a Department"
  },
  {
    route: "/employee-portal/training/",
    pageTitle: "Trainings",
    buttonText: "Add a Program"
  },
  {
    route: "/customer-portal/products/",
    pageTitle: "Products",
    buttonText: "Add a Product"
  },
  {
    route: "/customer-portal/orders/",
    pageTitle: "Orders",
    buttonText: "Add an Order"
  },
  {
    route: "/customer-portal/customers/",
    pageTitle: "Customers",
    buttonText: "Add a Customer"
  },
  {
    route: "/customer-portal/products",
    pageTitle: "Products",
    buttonText: "Add a Product"
  },
  {
    route: "/employee-portal/",
    pageTitle: "Dashboard",
    buttonText: null
  }
];

function TopNavBar({ view, pageTitle, openSidebar, buttonText }) {
  return (
    <>
      <div className="portalDiv">
        <h4 className="viewManager">{view.toUpperCase()} MANAGER</h4>
        <div className="portalButton">
          <Link
            to={
              view === "Employees" ? "/customer-portal/" : "/employee-portal/"
            }
          >
            <Button color="facebook">
              Go to{" "}
              {view === "Employees" ? "Customer Portal" : "Employee Portal"}
            </Button>
          </Link>
        </div>
      </div>
      <div className="barAndButtonContainer">
        <h1 className="viewHeader">{pageTitle}</h1>
        <div className="searchBarContainer">
          <Route
            path="/"
            render={props => {
              return <SearchBar {...props} />;
            }}
          />
          {buttonText && (
            <div className="buttonContainer">
              <Button color="orange" onClick={openSidebar}>
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function NavigationBar(props) {
  let routeInfo = routeData.find(r =>
    props.location.pathname.startsWith(r.route)
  );
  return (
    <>
      <TopNavBar
        view="Employees"
        buttonText={routeInfo.buttonText}
        pageTitle={routeInfo.pageTitle}
        openSidebar={props.openSidebar}
      />
    </>
  );
}
