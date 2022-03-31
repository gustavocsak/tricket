import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Accordion } from 'react-bootstrap';
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
                <Accordion>
                    {ticketsList.map((ticket) => (
                        <Ticket key={ticket.author} ticket={ticket} />
                    ))}
                </Accordion>
            </Container>
        </>
    );
};

export default Tickets;
