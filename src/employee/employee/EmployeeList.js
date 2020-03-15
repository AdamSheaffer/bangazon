import React, { Component } from "react";
import APIManager from "../../api/APIManager";
import EmployeeCard from "./EmployeeCard";
import EmployeeAdd from "./EmployeeAdd";
import { withRouter } from "react-router-dom";
import EmployeeDetails from "./EmployeeDetails";
import { Sidebar, Grid, Divider } from "semantic-ui-react";

class EmployeeList extends Component {
  state = {
    employees: [],
    storedEmployee: "",
    departments: [],
    selectedEmployee: null
  };

  selectEmployee = id => {
    const { selectedEmployee } = this.state;
    if (selectedEmployee && selectedEmployee.id === id) {
      this.setState({ selectedEmployee: null });
      return;
    }
    APIManager.getById("employees", id).then(employee => {
      this.setState({
        selectedEmployee: employee
      });
    });
  };

  searchEmployees() {
    if (this.props.searchValue === undefined) {
    } else
      APIManager.searchForEmployeeByName(
        this.props.searchValue[0],
        this.props.searchValue[1]
      ).then(response => {
        const employees = response.map(e => {
          e.department = this.state.departments.find(
            d => d.id === e.departmentId
          );
          return e;
        });
        this.setState({ employees });
      });
  }

  componentDidMount() {
    APIManager.getAll("departments")
      .then(departments => {
        return this.setState({ departments });
      })
      .then(() => this.searchEmployees());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.searchEmployees();
    }
  }
  render() {
    const newActive = this.props.sidebarState;
    console.log("employee state", this.props.searchValue);
    return (
      <>
        {this.props.searchValue === undefined ? (
          <>
            <div className="imgContainer">
              <img
                src={require("../../images/Empty-State-Charts.png")}
                className="employeeSearchImg"
                alt="magnifying glass"
              ></img>
            </div>
          </>
        ) : (
          <Grid>
            Search Results
            <Grid.Row columns="equal">
              <Grid.Column width={8}>
                {this.state.employees.map(employee => (
                  <EmployeeCard
                    key={employee.id}
                    selectEmployee={this.selectEmployee}
                    employee={employee}
                    sidebarState={this.props.sidebarState}
                    closeSidebar={this.props.closeSidebar}
                  />
                ))}
              </Grid.Column>
              <Grid.Column>
                {this.state.selectedEmployee ? (
                  <EmployeeDetails
                    toggle={this.props.toggle}
                    employee={this.state.selectedEmployee}
                    id={this.state.selectedEmployee.id}
                  />
                ) : null}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        <Sidebar
          animation="push"
          icon="labeled"
          inverted="false"
          onHide={null}
          vertical="false"
          visible={newActive}
          width="wide"
          direction="right"
        >
          <EmployeeAdd
            closeSidebar={this.props.closeSidebar}
            refresh={this.refresh}
          />
        </Sidebar>
      </>
    );
  }
}

export default withRouter(EmployeeList);
