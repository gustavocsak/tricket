import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Accordion } from 'react-bootstrap';
import Ticket from './Ticket.js';
import TicketForm from './TicketForm.js';
import TicketProjectControl from './TicketProjectControl.js';

const Tickets = (props) => {
    const [ticketsList, setTicketsList] = useState([]);
    const [showTicketForm, setShowTicketForm] = useState(false);
    const [ticketAdded, setTicketAdded] = useState(false);

    useEffect(() => {
        if (props.project) {
            axios
                .get(`/api/v1/projects/${props.project}/tickets`)
                .then((result) => {
                    setTicketsList(result.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [props.project, ticketAdded]);

    const handleTicketAdded = () => {
        setTicketAdded(!ticketAdded);
    };

    return (
        <>
            <Container className="p-5">
                <Accordion>
                    {ticketsList.length ? ticketsList.map((ticket, index) => <Ticket key={index} ticket={ticket} />) : <h3>No tickets to display</h3>}
                </Accordion>
            </Container>
            <Container>
                <TicketProjectControl setShowTicketForm={setShowTicketForm} />
            </Container>
            <Container>
                {showTicketForm ? (
                    <TicketForm handleTicketAdded={handleTicketAdded} projectId={props.project} setShowTicketForm={setShowTicketForm} />
                ) : (
                    <></>
                )}
            </Container>
        </>
    );
};

export default Tickets;
