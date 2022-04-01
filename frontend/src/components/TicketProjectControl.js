import React from 'react';
import { Button, Container } from 'react-bootstrap';
import TicketForm from './TicketForm';

const TicketProjectControl = (props) => {
    return (
        <>
            <Container>
                <Button className="me-3" onClick={() => props.setShowTicketForm(true)}>
                    Add new Ticket
                </Button>
                <Button variant="danger">Delete this Project</Button>
            </Container>
        </>
    );
};

export default TicketProjectControl;
