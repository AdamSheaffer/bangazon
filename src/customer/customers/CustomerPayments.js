import React, { useState } from "react";
import { Card, List, Divider, Button, Form, Dropdown } from "semantic-ui-react";

export default function CustomerPayments({
  paymentTypes,
  addCard,
  editCard,
  deleteCard,
  payments = []
}) {
  const [addForm, setAddForm] = useState(false);
  const [cardNumberToAdd, setcardNumberToAdd] = useState("");
  const [cardTypeToAdd, setCardTypeToAdd] = useState();
  const [cardToEdit, setCardToEdit] = useState(null);

  const submit = () => {
    addCard({
      acctNumber: cardNumberToAdd,
      paymentTypeId: cardTypeToAdd
    }).then(() => setAddForm(false));
  };

  const submitEdit = () => {
    editCard({
      acctNumber: cardToEdit.acctNumber,
      paymentTypeId: cardToEdit.paymentTypeId,
      id: cardToEdit.value
    }).then(() => setCardToEdit(null));
  };

  return (
    <Card fluid>
      <Card.Content>
        <h3 className="department-card__header">PAYMENT METHODS</h3>
        <Divider />
        {!payments.length && (
          <h5>
            <em>No Payment Methods</em>
          </h5>
        )}
        <List relaxed size="big" divided>
          {payments.map(p => (
            <List.Item key={p.value}>
              <List.Icon
                className="non-card-icon"
                name="credit card outline"
                color="teal"
                size="large"
                verticalAlign="middle"
              />
              <List.Content>
                {cardToEdit && cardToEdit.value === p.value ? (
                  <Form onSubmit={() => submitEdit()}>
                    <Form.Group>
                      <Form.Input
                        inline
                        value={cardToEdit.acctNumber}
                        onChange={e =>
                          setCardToEdit({
                            ...cardToEdit,
                            acctNumber: e.target.value
                          })
                        }
                      />
                      <Button content="Update" color="orange" type="submit" />
                      <Button
                        type="button"
                        content="Cancel"
                        color="orange"
                        basic
                        onClick={() => setCardToEdit(null)}
                      />
                    </Form.Group>
                  </Form>
                ) : (
                  <>
                    <List.Header as="h3">{p.text}</List.Header>
                    <span
                      onClick={() => setCardToEdit({ ...p })}
                      className="action-link"
                    >
                      Edit |
                    </span>{" "}
                    <span
                      onClick={() => deleteCard(p.value)}
                      className="action-link"
                    >
                      Delete
                    </span>
                  </>
                )}
              </List.Content>
            </List.Item>
          ))}
        </List>
        {!addForm && (
          <Button
            disabled={!!cardToEdit}
            onClick={() => setAddForm(true)}
            color="facebook"
          >
            Add
          </Button>
        )}
        {addForm && (
          <Form>
            <Form.Group inline>
              <Form.Field width={8}>
                <input
                  placeholder="Card Number"
                  value={cardNumberToAdd}
                  onChange={e => setcardNumberToAdd(e.target.value)}
                />
              </Form.Field>
              <Form.Field width={8}>
                <Dropdown
                  placeholder="Card Type"
                  selection
                  value={cardTypeToAdd}
                  options={paymentTypes.map(t => ({
                    text: t.name,
                    value: t.id
                  }))}
                  onChange={(e, { value }) => setCardTypeToAdd(value)}
                />
              </Form.Field>
            </Form.Group>
            <Button color="orange" onClick={submit}>
              Add Card
            </Button>
            <Button basic color="orange" onClick={() => setAddForm(false)}>
              Cancel
            </Button>
          </Form>
        )}
      </Card.Content>
    </Card>
  );
}
