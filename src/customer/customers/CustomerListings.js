import React, { useState, useEffect } from "react";
import { Card, Table, Sidebar, Button, Modal } from "semantic-ui-react";
import ProductAdd from "../product/ProductAdd";
import ProductEdit from "../product/ProductEdit";
import APIManager from "../../api/APIManager";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

export default function CustomerListings({
  products,
  onProductAdd,
  customerId
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarComponent, setSidebarComponent] = useState("add");
  const [productToEdit, setProductToEdit] = useState();
  const [productToDelete, setProductToDelete] = useState();

  useEffect(() => {
    setSidebarOpen(false);
  }, [products]);

  const onSave = () => {
    setSidebarOpen(false);
    onProductAdd();
  };

  const openAdd = () => {
    setSidebarOpen(true);
    setSidebarComponent("add");
  };

  const openEdit = id => {
    setSidebarOpen(true);
    setSidebarComponent("edit");
    setProductToEdit(id);
  };

  const deleteProduct = () => {
    APIManager.deleteData("products", productToDelete.id).then(() => {
      onProductAdd();
      setProductToDelete(null);
    });
  };

  return (
    <>
      <Sidebar
        visible={sidebarOpen}
        direction="right"
        width="wide"
        animation="overlay"
      >
        {sidebarComponent === "add" ? (
          <ProductAdd
            onCancel={() => setSidebarOpen(false)}
            onSave={onSave}
            customerId={customerId}
          />
        ) : (
          <ProductEdit
            onCancel={() => setSidebarOpen(false)}
            onSave={onSave}
            productId={productToEdit}
          />
        )}
      </Sidebar>
      <Card fluid>
        <Card.Content>
          <h3 className="department-card__header">LISTINGS</h3>
          <Button color="facebook" content="Add Listing" onClick={openAdd} />
          {!products.length && (
            <h5>
              <em>No product listings</em>
            </h5>
          )}
          {!!products.length && (
            <Table striped size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Product</Table.HeaderCell>
                  <Table.HeaderCell>Added Date</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {products.map(p => (
                  <Table.Row key={p.id}>
                    <Table.Cell>{p.title}</Table.Cell>
                    <Table.Cell>
                      {dateFormatter.format(p.createdDate)}
                    </Table.Cell>
                    <Table.Cell>{currencyFormatter.format(p.price)}</Table.Cell>
                    <Table.Cell>
                      <Button
                        title="Edit"
                        size="small"
                        basic
                        icon="edit"
                        onClick={() => openEdit(p.id)}
                      />
                      <Button
                        title="Remove"
                        size="small"
                        basic
                        icon="trash alternate"
                        color="red"
                        onClick={() => setProductToDelete(p)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Card.Content>
      </Card>
      <Modal
        open={!!productToDelete}
        size="mini"
        dimmer="inverted"
        closeIcon
        closeOnDimmerClick
        closeOnDocumentClick
      >
        <Modal.Header>Remove Product</Modal.Header>
        <Modal.Content>
          Are you sure you want to remove this product listing?
          <div>
            <strong>{productToDelete && productToDelete.title}</strong>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={deleteProduct} color="orange">
            Remove Listing
          </Button>
          <Button
            basic
            onClick={() => setProductToDelete(null)}
            color="orange"
            content="Go Back"
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}
