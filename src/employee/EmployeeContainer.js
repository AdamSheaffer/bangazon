import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavigationBar from "../nav/NavBar";
import DepartmentTable from "./department/DepartmentTable";
import EmployeeDashboard from "./EmployeeDashboard";
import SideBar from "../nav/SideBar";
import EmployeeList from "./employee/EmployeeList";
import ComputerTable from "./computer/ComputerTable";
import TrainingList from "./training/TrainingList";

export default class EmployeeContainer extends Component {
  state = {
    addResourceSidebar: false
  };

  handleOpenNewResource = () => this.setState({ addResourceSidebar: true });
  handleCloseNewResource = () => this.setState({ addResourceSidebar: false });

  render() {
    return (
      <>
        <SideBar view="Employees" />

        <div className="containerDiv">
          <Route
            path="/"
            render={props => {
              return (
                <NavigationBar
                  view="Employees"
                  openSidebar={this.handleOpenNewResource}
                  {...props}
                />
              );
            }}
          />

          <Route
            exact
            path="/employee-portal/"
            render={props => {
              return <EmployeeDashboard {...props} />;
            }}
          />

          <Route
            exact
            path="/employee-portal/computers/"
            render={props => {
              return (
                <ComputerTable
                  sidebarState={this.state.addResourceSidebar}
                  closeSidebar={this.handleCloseNewResource}
                  {...props}
                />
              );
            }}
          />

          <Route
            path="/employee-portal/computers/:computerId(\d+)/"
            render={props => {
              const searchValue = parseInt(props.match.params.computerId);
              return (
                <ComputerTable
                  searchValue={searchValue}
                  sidebarState={this.state.addResourceSidebar}
                  closeSidebar={this.handleCloseNewResource}
                  {...props}
                />
              );
            }}
          />

          <Route
            exact
            path="/employee-portal/training/"
            render={props => {
              return (
                <TrainingList
                  sidebarState={this.state.addResourceSidebar}
                  closeSidebar={this.handleCloseNewResource}
                  {...props}
                />
              );
            }}
          />

          <Route
            path="/employee-portal/training/:trainingId(\d+)/"
            render={props => {
              const searchValue = parseInt(props.match.params.trainingId);
              return (
                <TrainingList
                  searchValue={searchValue}
                  sidebarState={this.state.addResourceSidebar}
                  closeSidebar={this.handleCloseNewResource}
                  {...props}
                />
              );
            }}
          />

          <Route
            exact
            path="/employee-portal/employees/"
            render={props => {
              return <EmployeeList />;
            }}
          />

          <Route
            path="/employee-portal/employees/:employeeName/"
            render={props => {
              const searchName = props.match.params.employeeName;
              const splitName = searchName.split("-");
              return (
                <EmployeeList
                  searchValue={splitName}
                  sidebarState={this.state.addResourceSidebar}
                  closeSidebar={this.handleCloseNewResource}
                  {...props}
                />
              );
            }}
          />

          <Route
            exact
            path="/employee-portal/departments/"
            render={props => {
              return (
                <DepartmentTable
                  sidebarState={this.state.addResourceSidebar}
                  closeSidebar={this.handleCloseNewResource}
                />
              );
            }}
          />

          <Route
            path="/employee-portal/departments/:departmentId(\d+)/"
            render={props => {
              const searchValue = parseInt(props.match.params.departmentId);
              return (
                <DepartmentTable
                  searchValue={searchValue}
                  sidebarState={this.state.addResourceSidebar}
                  closeSidebar={this.handleCloseNewResource}
                  {...props}
                />
              );
            }}
          />
        </div>
      </>
    );
  }
}
