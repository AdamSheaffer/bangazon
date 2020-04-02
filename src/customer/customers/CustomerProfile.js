import React, { useState } from "react";
import {
  List,
  Button,
  Icon,
  Grid,
  Header,
  Divider,
  Form,
  Card
} from "semantic-ui-react";

const dateOptions = {
  year: "numeric",
  month: "short",
  day: "numeric"
};
const dateFormatter = new Intl.DateTimeFormat("en-US", dateOptions);

const phoneFormatter = str => {
  const cleaned = ("" + str).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  return match ? "(" + match[1] + ") " + match[2] + "-" + match[3] : null;
};

export default function CustomerProfile({ customer, onProfileChange }) {
  const [showingForm, setShowingForm] = useState(false);

  const updateProfile = profile => {
    onProfileChange(profile).then(() => setShowingForm(false));
  };

  return (
    <div className="card-margin">
      <Grid>
        <Grid.Column>
          <Header
            icon
            as="h1"
            className="viewHeader"
            textAlign="center"
            color="grey"
          >
            <Icon name="user circle outline" size="massive" color="grey" />
            {customer.firstName} {customer.lastName}
          </Header>
          <div>
            <Button
              style={{ margin: "auto", display: "block" }}
              color="orange"
              content="Edit Profile"
              size="mini"
              disabled={showingForm}
              onClick={() => setShowingForm(true)}
            />
          </div>
          <Divider />
          <Card fluid>
            <Card.Content>
              {!showingForm && (
                <List size="big" relaxed>
                  <List.Item
                    icon="id badge outline"
                    content={
                      <span>
                        <strong>Customer ID:</strong> {customer.id}
                      </span>
                    }
                  />
                  <List.Item
                    icon="calendar outline"
                    content={
                      <span>
                        <strong>Member Since:</strong>{" "}
                        {dateFormatter.format(new Date(customer.createdDate))}
                      </span>
                    }
                  />
                  <List.Item
                    icon="mail outline"
                    content={
                      <a href={"mailto:" + customer.email}>{customer.email}</a>
                    }
                  />
                  <List.Item
                    icon="phone"
                    content={phoneFormatter(customer.phone)}
                  />
                  <List.Item
                    icon="marker"
                    content={
                      <div>
                        <div>{customer.address}</div>
                        <div>
                          {customer.city}
                          {","} {customer.state}
                        </div>
                      </div>
                    }
                  />
                </List>
              )}

              {showingForm && (
                <CustomerProfileEdit
                  customer={customer}
                  onCancel={() => setShowingForm(false)}
                  onSave={updateProfile}
                />
              )}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
}

function CustomerProfileEdit({ customer, onCancel, onSave }) {
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const [address, setAddress] = useState(customer.address);
  const [state, setState] = useState(customer.state);
  const [city, setCity] = useState(customer.city);

  const submit = () => {
    const updated = Object.assign(
      { ...customer },
      {
        firstName,
        lastName,
        email,
        phone,
        address,
        state,
        city
      }
    );
    onSave(updated);
  };

  return (
    <Form>
      <Form.Field>
        <label>First Name</label>
        <input
          onChange={e => setFirstName(e.target.value)}
          id="firstName"
          value={firstName}
        />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input
          onChange={e => setLastName(e.target.value)}
          id="lastName"
          value={lastName}
        />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input
          onChange={e => setEmail(e.target.value)}
          id="email"
          value={email}
        />
      </Form.Field>
      <Form.Field>
        <label>Phone</label>
        <input
          onChange={e => setPhone(e.target.value)}
          id="phone"
          type="number"
          value={phone}
        />
      </Form.Field>
      <Form.Field>
        <label>Address</label>
        <input
          onChange={e => setAddress(e.target.value)}
          id="address"
          value={address}
        />
      </Form.Field>
      <Form.Field>
        <label>City</label>
        <input onChange={e => setCity(e.target.value)} id="city" value={city} />
      </Form.Field>
      <Form.Field>
        <label>State</label>
        <input
          onChange={e => setState(e.target.value)}
          id="state"
          value={state}
        />
      </Form.Field>
      <Button content="Update Profile" onClick={submit} color="orange" />
      <Button content="Cancel" onClick={onCancel} basic color="orange" />
    </Form>
  );
}
