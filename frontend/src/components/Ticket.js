import React from 'react';
import { Accordion, Container, Table } from 'react-bootstrap';

const Ticket = (props) => {
    const { author, title, _id } = props.ticket;

    return (
        <Container>
            {/* <Container>
                <Accordion.Item eventKey={_id}>
                    <Accordion.Header>{title}</Accordion.Header>
                    <Accordion.Body>{author}</Accordion.Body>
                </Accordion.Item>
            </Container> */}
        </Container>
    );
};

export default Ticket;
