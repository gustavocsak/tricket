import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const Ticket = (props) => {
    const { author, title, _id } = props.ticket;

    return (
        <Accordion.Item eventKey={_id}>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>{author}</Accordion.Body>
        </Accordion.Item>
    );
};

export default Ticket;
