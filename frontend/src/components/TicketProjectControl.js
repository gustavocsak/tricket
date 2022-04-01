import React from 'react';
import { Button, Container } from 'react-bootstrap';

const TicketProjectControl = () => {
    return (
        <Container>
            <Button className="me-3">Add new Ticket</Button>
            <Button>Delete this Project</Button>
        </Container>
    );
};

export default TicketProjectControl;
