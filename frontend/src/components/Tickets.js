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
    const [postErrors, setPostErrors] = useState({});
    const [patchErrors, setPatchErrors] = useState({});
    const [postSuccess, setPostSuccess] = useState(false);
    const [patchSuccess, setPatchSuccess] = useState(false);

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

    const handleCloseAddForm = () => {
        setPostErrors({});
        setPostSuccess(false);
        setShowTicketForm(false);
    };

    const dataValidation = (object) => {
        const { title, author, description, status } = object;

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

        return errors;
    };

    const handleTicketSubmission = (event, ticket, method) => {
        if (method == 'post') {
            let errors = dataValidation(ticket);
            if (Object.keys(errors).length > 0) {
                setPostErrors(errors);
            } else {
                console.log(ticket);
                axios
                    .post(`/api/v1/projects/${props.project}/tickets`, ticket)
                    .then((result) => {
                        setPostSuccess(true);
                        setTicketAdded(!ticketAdded);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else if (method == 'patch') {
            let errors = dataValidation(ticket);
            if (Object.keys(errors).length > 0) {
                setPatchErrors(errors);
            } else {
                axios
                    .patch(`/api/v1/tickets/${ticket._id}`, ticket)
                    .then((result) => {
                        setPatchSuccess(true);
                        setTicketAdded(!ticketAdded);
                        console.log(result);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };

    return (
        <>
            <Container className="p-3">
                {ticketsList.length ? (
                    <Container>
                        <TicketsTable
                            tickets={ticketsList}
                            handleTicketSubmission={handleTicketSubmission}
                            setShowTicketForm={handleCloseAddForm}
                            setPatchErrors={setPatchErrors}
                            errors={patchErrors}
                            setPatchSuccess={setPatchSuccess}
                            patchSuccess={patchSuccess}
                        />
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
                        handleTicketSubmission={handleTicketSubmission}
                        handleCloseForm={handleCloseAddForm}
                        errors={postErrors}
                        success={postSuccess}
                        method="post"
                    />
                ) : (
                    <></>
                )}
            </Container>
        </>
    );
};

export default Tickets;
