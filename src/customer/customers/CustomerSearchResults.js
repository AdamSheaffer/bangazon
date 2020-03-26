import React from "react";
import { Table, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function CustomerSearchResults({ customers }) {
  return (
    <Table basic striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Customer ID</Table.HeaderCell>
          <Table.HeaderCell>Address</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Phone</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {customers.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>
              <Icon name="user circle outline" size="large" color="teal" />
            </Table.Cell>
            <Table.Cell component="th" scope="row">
              {item.firstName} {item.lastName}
            </Table.Cell>
            <Table.Cell align="right">
              <Link>#{item.id}</Link>
            </Table.Cell>
            <Table.Cell align="right">
              {item.address}, {item.state}
            </Table.Cell>
            <Table.Cell align="right">{item.email}</Table.Cell>
            <Table.Cell align="right">{item.phone}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
