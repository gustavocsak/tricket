import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Accordion } from 'react-bootstrap';
import Ticket from './Ticket.js';
import TicketProjectControl from './TicketProjectControl.js';

const Tickets = (props) => {
    const [ticketsList, setTicketsList] = useState([]);

    useEffect(() => {
        if (props.project) {
            axios
                .get(`/project/${props.project}/tickets`)
                .then((result) => {
                    setTicketsList(result.data.tickets);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [props.project]);

    return (
        <>
            <Container className="p-5">
                <Accordion>
                    {ticketsList.length ? (
                        ticketsList.map((ticket) => <Ticket key={ticket.author} ticket={ticket} />)
                    ) : (
                        <h3>No tickets to display</h3>
                    )}
                </Accordion>
            </Container>
            <Container>
                <TicketProjectControl />
            </Container>
        </>
    );
};

export default Tickets;
