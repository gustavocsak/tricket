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

    return (
        <Container className="p-5 mt-5 mb-3 border">
            <Form onSubmit={(event) => props.handleTicketSubmission(event, ticket, props.method)}>
                <CloseButton className="float-end" onClick={() => props.setShowTicketForm(false)} />

                <Form.Group className="mb-4">
                    <Form.Label>Ticket Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a title for this ticket"
                        onChange={(e) => setField('title', e.target.value)}
                        isInvalid={props.errors.title}
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
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Control as="select" type="select" onChange={(e) => setField('status', e.target.value)} isInvalid={props.errors.status}>
                        <option value="">Select the status for this ticket</option>
                        <option value="open">Open</option>
                        <option value="progress">Work in Progress</option>
                        <option value="closed">Closed</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{props.errors.status}</Form.Control.Feedback>
                </Form.Group>
                {console.log(props.success)}

                {props.success ? <Alert variant="success">Success! Your Ticket information was posted and added to your project list!</Alert> : <></>}

                <Button className="me-3" variant="success" type="submit">
                    Add ticket
                </Button>
                <Button variant="danger" onClick={() => props.setShowTicketForm(false)}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default TicketForm;
