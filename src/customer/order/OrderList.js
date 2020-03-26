import React from "react";
import { Table } from "semantic-ui-react";

export default function OrderList({ orders }) {
  return (
    <Table size="large" striped fixed singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Order #</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Customer</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map(order => (
          <Table.Row key={order.id}>
            <Table.Cell>#{order.id}</Table.Cell>
            <Table.Cell>{order.name}</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
