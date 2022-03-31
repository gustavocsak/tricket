import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const Ticket = (props) => {
    const { author, title } = props.ticket;

    return (
        <Accordion.Item eventKey={author} key={author}>
            <Accordion.Header style={{ fontWeight: 'bold' }}>{title}</Accordion.Header>
            <Accordion.Body>{author}</Accordion.Body>
        </Accordion.Item>
    );
};

export default Ticket;
