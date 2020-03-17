import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Header, Icon } from "semantic-ui-react";
import APIManager from "../api/APIManager";
import { notify } from "react-notify-toast";

export default class TrainingDashboardCard extends Component {
  state = {
    trainingPrograms: []
  };

  componentDidMount() {
    APIManager.getAll("trainingPrograms")
      .then(programs => {
        const dateOptions = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric"
        };
        const formatter = new Intl.DateTimeFormat("en-US", dateOptions);
        const trainingPrograms = programs.slice(0, 3).map(p => {
          return {
            id: p.id,
            name: p.name,
            start: formatter.format(new Date(p.startDate)),
            end: formatter.format(new Date(p.endDate))
          };
        });
        this.setState({
          trainingPrograms
        });
      })
      .catch(err => {
        notify.show("There was an error getting training programs", "error");
      });
  }

  render() {
    const { trainingPrograms } = this.state;
    return (
      <Card fluid>
        <Card.Content>
          <h3 className="department-card__header">TRAININGS</h3>
          <h3>Upcoming Trainings</h3>
          {trainingPrograms.map(tp => (
            <div key={tp.id}>
              <h5 className="training-program-name">{tp.name}</h5>
              <span className="training-program-dates">
                {tp.start} - {tp.end}
              </span>
              <hr />
            </div>
          ))}
          <Header textAlign="right">
            <Link to="/employee-portal/training">
              More
              <Icon name="arrow right" />
            </Link>
          </Header>
        </Card.Content>
      </Card>
    );
  }
}
