import React from "react";
import { Table, Card } from "semantic-ui-react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

function CustomerOrders({ orders }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  return (
    <Card fluid>
      <Card.Content>
        <h3 className="department-card__header">ORDERS</h3>
        {!orders.length && (
          <h5>
            <em>No Orders Made</em>
          </h5>
        )}

        {orders.map(order => (
          <div key={order.id}>
            <Table key={order.id} attached="top" basic>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={8}>
                    Order # {order.id}
                  </Table.HeaderCell>
                  <Table.HeaderCell width={4}></Table.HeaderCell>
                  <Table.HeaderCell width={4} textAlign="right">
                    Total:
                    {formatter.format(
                      order.products.reduce((t, p) => t + p.price, 0)
                    )}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            </Table>

            <Table attached>
              <Table.Body>
                {order.products.map(product => (
                  <Table.Row key={product.id}>
                    <Table.Cell width={6}>{product.title}</Table.Cell>
                    <Table.Cell width={3}></Table.Cell>
                    <Table.Cell width={4}>
                      {formatter.format(product.price)}
                    </Table.Cell>
                    <Table.Cell width={3}>
                      <Link
                        to={`/customer-portal/customers/${product.customerId}`}
                      >
                        Seller
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}

export default withRouter(CustomerOrders);
