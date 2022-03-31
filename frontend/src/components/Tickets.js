import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Ticket from './Ticket.js';

const Tickets = (props) => {
    const [ticketsList, setTicketsList] = useState([]);

    useEffect(() => {
        axios
            .get(`/project/${props.project}/tickets`)
            .then((result) => {
                setTicketsList(result.data.tickets);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.project]);

    return (
        <>
            <Container className="p-5">
                <ul>
                    {ticketsList.map((ticket) => {
                        return <li key={ticket.title}>{ticket.title}</li>;
                    })}
                </ul>
            </Container>
        </>
    );
};

export default Tickets;
