import React from 'react';
import { Button, Container } from 'react-bootstrap';
import TicketForm from './TicketForm';

const TicketProjectControl = () => {
    return (
        <>
            <Container>
                <Button className="me-3">Add new Ticket</Button>
                <Button variant="danger">Delete this Project</Button>
            </Container>
        </>
    );
};

export default TicketProjectControl;
