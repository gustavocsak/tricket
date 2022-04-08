import React, { useEffect, useState } from 'react';
import { Container, Form, Alert, CloseButton, Button } from 'react-bootstrap';

const TicketForm = (props) => {
    const [ticket, setTicket] = useState({});

    const setField = (field, value) => {
        setTicket({
            ...ticket,
            [field]: value,
        });
    };

    useEffect(() => {
        setTicket({ ...props.ticketToEdit });
    }, [props.editing]);

    return (
        <Container className="p-5 mt-5 mb-3 border">
            <Form
                onSubmit={function (event) {
                    event.preventDefault();
                    props.handleTicketSubmission(event, ticket, props.method);
                }}
            >
                {props.method == 'post' ? <CloseButton className="float-end" onClick={() => props.setShowTicketForm(false)} /> : <></>}

                <Form.Group className="mb-4">
                    <Form.Label>Ticket Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a title for this ticket"
                        onChange={(e) => setField('title', e.target.value)}
                        isInvalid={props.errors.title}
                        readOnly={props.readOnly}
                        defaultValue={props.ticketToEdit ? props.ticketToEdit.title : undefined}
                    />
                    <Form.Control.Feedback type="invalid">{props.errors.title}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Ticket Opened by</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the author for this ticket"
                        onChange={(e) => setField('author', e.target.value)}
                        isInvalid={props.errors.author}
                        readOnly={props.readOnly}
                        defaultValue={props.ticketToEdit ? props.ticketToEdit.author : undefined}
                    />
                    <Form.Control.Feedback type="invalid">{props.errors.author}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Ticket Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        type="text"
                        placeholder="Brief description for your ticket"
                        onChange={(e) => setField('description', e.target.value)}
                        readOnly={props.readOnly}
                        defaultValue={props.ticketToEdit ? props.ticketToEdit.description : undefined}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Control
                        as="select"
                        type="select"
                        onChange={(e) => setField('status', e.target.value)}
                        isInvalid={props.errors.status}
                        readOnly={props.readOnly}
                        defaultValue={props.ticketToEdit ? props.ticketToEdit.status : undefined}
                    >
                        <option value="">Select the status for this ticket</option>
                        <option value="open">Open</option>
                        <option value="progress">Work in Progress</option>
                        <option value="closed">Closed</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{props.errors.status}</Form.Control.Feedback>
                </Form.Group>

                {props.success ? <Alert variant="success">Success! Your Ticket information was posted and added to your project list!</Alert> : <></>}

                {props.editSuccess ? <Alert variant="success">Success! Your Ticket was edited!</Alert> : <></>}

                {props.method == 'post' ? (
                    <>
                        <Button className="me-3" variant="success" type="submit">
                            Add ticket
                        </Button>
                        <Button variant="danger" onClick={() => props.handleCloseForm(false)}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        {!props.editing ? (
                            <>
                                <Button className="me-3" variant="primary" type="button" key={2} onClick={() => props.handleEditButton()}>
                                    Edit Ticket
                                </Button>
                                <Button variant="danger" onClick={() => props.handleCloseForm(false)}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button className="me-3" variant="success" type="submit" key={1}>
                                    Confirm Changes
                                </Button>
                                <Button variant="danger" onClick={() => props.handleCloseForm(false)}>
                                    Cancel
                                </Button>
                            </>
                        )}
                    </>
                )}
            </Form>
        </Container>
    );
};

export default TicketForm;
