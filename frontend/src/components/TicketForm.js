import React, { useState } from 'react';
import { Container, Form, Row, Col, CloseButton, Button } from 'react-bootstrap';

const TicketForm = () => {
    const [ticket, setTicket] = useState({});

    const setField = (field, value) => {
        setTicket({
            ...ticket,
            [field]: value,
        });
    };

    const formDataValidation = () => {
        const { name, author } = projectInfo;

        const errors = {};

        if (!name || name == '') {
            errors.name = 'Project name must not be blank.';
        } else if (name.length > 30) {
            errors.name = 'Project name must be less than 30 characters.';
        }

        if (!author || author == '') {
            errors.author = 'Author name must not be blank.';
        } else if (author.length > 30) {
            console.log(author.length);
            errors.author = 'Author name must be less than 30 characters.';
        }

        return errors;
    };

    const handleTicketSubmission = (event) => {
        console.log('ticket submitted');
    };

    return (
        <Container className="p-5 mt-5 border">
            <Form onSubmit={(event) => handleTicketSubmission(event)}>
                <CloseButton className="float-end" />

                <Form.Group className="mb-4">
                    <Form.Label>Ticket Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a title for this ticket"
                        onChange={(e) => setField('title', e.target.value)}
                        // isInvalid={errors.name}
                    />
                    {/* <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback> */}
                </Form.Group>
            </Form>

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
                <Form.Select onChange={(e) => setField('status', e.target.value)}>
                    <option value="">Select the status for this ticket</option>
                    <option value="open">Open</option>
                    <option value="progress">Work in Progress</option>
                    <option value="closed">Closed</option>
                </Form.Select>
            </Form.Group>

            <Button className="me-3" variant="success">
                Add ticket
            </Button>
            <Button variant="danger">Cancel</Button>
        </Container>
    );
};

export default TicketForm;
