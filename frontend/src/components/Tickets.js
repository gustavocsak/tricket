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
    const [errors, setErrors] = useState({});
    const [showSuccessSubmission, setShowSuccessSubmission] = useState(false);

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

    const handleCloseForm = () => {
        setShowSuccessSubmission(false);
        setShowTicketForm(false);
    };

    const handleTicketAdded = (event, ticket) => {
        const { title, description, status, author } = ticket;

        const errors = {};

        const ticketValidStatus = ['open', 'progress', 'closed'];

        if (!title || title == '') {
            errors.title = 'Ticket title must not be blank.';
        } else if (title.length > 30) {
            errors.name = 'Ticket title must be less than 30 characters.';
        }

        if (!author || author == '') {
            errors.author = 'Ticket author must not be blank.';
        } else if (author.length > 30) {
            errors.author = 'Ticket author must be less than 30 characters.';
        }

        if (!status || status == '') {
            errors.status = 'Please select a valid status for your ticket';
        } else if (!ticketValidStatus.includes(status)) {
            errors.status = 'Please select a valid status for your ticket';
        }

        event.preventDefault();

        console.log('ola!');
        console.log(props.project);

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            console.log(ticket);
            axios
                .post(`/api/v1/projects/${props.project}/tickets`, ticket)
                .then((result) => {
                    setShowSuccessSubmission(true);
                    setTicketAdded(!ticketAdded);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                    <TicketForm
                        handleTicketSubmission={handleTicketAdded}
                        setShowTicketForm={handleCloseForm}
                        errors={errors}
                        success={showSuccessSubmission}
                    />
                ) : (
                    <></>
                )}
            </Container>
        </>
    );
};

export default Tickets;
