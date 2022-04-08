import React from 'react';
import { Button, Container } from 'react-bootstrap';

const TicketControl = (props) => {
    return (
        <>
            <Container className="mb-5">
                <Button className="me-3" onClick={() => props.setShowTicketForm(true)}>
                    Add new Ticket
                </Button>
            </Container>
        </>
    );
};

export default TicketControl;
