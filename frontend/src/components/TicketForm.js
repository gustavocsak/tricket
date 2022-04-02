import React, { useState } from 'react';
import { Container, Form, Alert, CloseButton, Button } from 'react-bootstrap';
import axios from 'axios';

const TicketForm = (props) => {
    const [ticket, setTicket] = useState({});
    const [errors, setErrors] = useState({});
    const [showSuccessSubmission, setShowSuccessSubmission] = useState(false);

    const setField = (field, value) => {
        setTicket({
            ...ticket,
            [field]: value,
        });
    };

    const formDataValidation = () => {
        const { title, description, status, author } = ticket;

        const errors = {};

        const ticketValidStatus = ['open', 'progress', 'closed'];

        if (!title || title == '') {
            errors.title = 'Ticket title must not be blank.';
        } else if (title.length > 30) {
            errors.name = 'Ticket title must be less than 30 characters.';
        }

        if (!author || author == '') {
            errors.author = 'Ticket author must not be blank.';
        } else if (author.length > 30) {
            errors.author = 'Ticket author must be less than 30 characters.';
        }

        if (!status || status == '') {
            errors.status = 'Please select a valid status for your ticket';
        } else if (!ticketValidStatus.includes(status)) {
            errors.status = 'Please select a valid status for your ticket';
        }

        return errors;
    };

    const handleTicketSubmission = (event) => {
        event.preventDefault();

        const errors = formDataValidation();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            axios
                .post(`/project/${props.projectId}/ticket`, ticket)
                .then((result) => {
                    console.log(result);

                    setShowSuccessSubmission(true);
                })
                .catch((error) => {
                    console.log(error);
                });
            props.handleTicketAdded();
        }
    };

    return (
        <Container className="p-5 mt-5 mb-3 border">
            <Form onSubmit={(event) => handleTicketSubmission(event)}>
                <CloseButton className="float-end" onClick={() => props.setShowTicketForm(false)} />

                <Form.Group className="mb-4">
                    <Form.Label>Ticket Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a title for this ticket"
                        onChange={(e) => setField('title', e.target.value)}
                        isInvalid={errors.title}
                    />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Ticket Opened by</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the author for this ticket"
                        onChange={(e) => setField('author', e.target.value)}
                        isInvalid={errors.author}
                    />
                    <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
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
                    <Form.Control as="select" type="select" onChange={(e) => setField('status', e.target.value)} isInvalid={errors.status}>
                        <option value="">Select the status for this ticket</option>
                        <option value="open">Open</option>
                        <option value="progress">Work in Progress</option>
                        <option value="closed">Closed</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
                </Form.Group>

                {showSuccessSubmission ? (
                    <Alert variant="success">Success! Your Ticket information was posted and added to your project list!</Alert>
                ) : (
                    <></>
                )}

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
