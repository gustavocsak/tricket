import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import TicketForm from './TicketForm.js';
import TicketProjectControl from './TicketProjectControl.js';
import TicketsTable from './TicketsTable.js';

const Tickets = (props) => {
    const [ticketsList, setTicketsList] = useState([]);
    const [showTicketForm, setShowTicketForm] = useState(false);
    const [ticketAdded, setTicketAdded] = useState(false);

    useEffect(() => {
        if (props.project) {
            axios
                .get(`/api/v1/projects/${props.project}/tickets`)
                .then((result) => {
                    setTicketsList(result.data.tickets);
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
                {ticketsList.length ? (
                    <Container>
                        <TicketsTable tickets={ticketsList} />
                    </Container>
                ) : (
                    <h3>No tickets to display</h3>
                )}
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
