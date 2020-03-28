import React from "react";
import RevenueCard from "./RevenueCard";
import { Grid } from "semantic-ui-react";
import BestSellers from "./BestSellers";
import NewCustomers from "./NewCustomers";

export default function Dashboard(props) {
  return (
    <>
      <div className="barAndButtonContainer">
        <h1 className="viewHeader">Dashboard</h1>
      </div>
      <div className="dashboard-container">
        <Grid>
          <Grid.Row columns={16}>
            <Grid.Column width={10}>
              <RevenueCard />
            </Grid.Column>
            <Grid.Column width={6}>
              <div className="dashboard__img-container">
                <img
                  src={require("../../images/Workflows.png")}
                  alt="welcome flag"
                  className="dashboard__img"
                ></img>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal">
            <Grid.Column width={6}>
              <BestSellers />
            </Grid.Column>
            <Grid.Column width={6}>
              <NewCustomers />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
}
