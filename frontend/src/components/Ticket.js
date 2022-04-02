import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const Ticket = (props) => {
    const { author, title, id } = props.ticket;

    return (
        <Accordion.Item eventKey={id} key={id}>
            <Accordion.Header style={{ fontWeight: 'bold' }}>{title}</Accordion.Header>
            <Accordion.Body>{author}</Accordion.Body>
        </Accordion.Item>
    );
};

export default Ticket;
