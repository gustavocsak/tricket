import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import TicketModal from './TicketModal';
import axios from 'axios';

const TicketsTable = (props) => {
    const fields = ['id', 'title', 'author', 'status', 'action'];
    const [showModal, setShowModal] = useState(false);
    const [ticket, setTicket] = useState({});
    const [readOnly, setReadOnly] = useState(true);
    const [editing, setEditing] = useState(false);
    const [initialMount, setInitialMount] = useState(true);

    useEffect(() => {
        if (!initialMount) {
            handleConfirmChanges();
        } else {
            setInitialMount(false);
        }
    }, [props.patchSuccess]);

    const handleAction = (ticket) => {
        setTicket(ticket);
        setShowModal(!showModal);
    };

    const handleDelete = (ticket) => {
        axios
            .delete(`/api/v1/tickets/${ticket._id}`)
            .then((result) => {
                props.handleTicketDelete();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCloseModal = () => {
        setReadOnly(true);
        setEditing(false);
        props.setPatchSuccess(false);
        props.setPatchErrors({});
        setShowModal(!showModal);
    };

    const handleEditButton = () => {
        props.setPatchErrors({});
        setReadOnly(false);
        setEditing(true);
    };

    const handleConfirmChanges = () => {
        setReadOnly(true);
        setEditing(false);
        props.setPatchSuccess(true);
    };

    return (
        <Container>
            <Table responsive className="table-bordered table-hover">
                <thead>
                    <tr className="table-dark">
                        {fields.map((field, index) => {
                            return <th key={index}>{field}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.tickets.map((ticket, index) => {
                        return (
                            <tr key={index}>
                                <td>{ticket._id}</td>
                                <td>{ticket.title}</td>
                                <td>{ticket.author}</td>
                                <td>
                                    <span className="badge bg-secondary">{ticket.status}</span>
                                </td>
                                <td>
                                    <Button type="button" className="btn btn-primary" onClick={() => handleAction(ticket)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-eye-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                        </svg>
                                    </Button>
                                    <Button type="button" className="btn btn-danger" onClick={() => handleDelete(ticket)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                            />
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <TicketModal
                show={showModal}
                handleClose={handleCloseModal}
                ticket={ticket}
                handleTicketSubmission={props.handleTicketSubmission}
                setShowTicketForm={props.setShowTicketForm}
                errors={props.errors}
                readOnly={readOnly}
                setReadOnly={setReadOnly}
                handleEditButton={handleEditButton}
                editing={editing}
                success={props.patchSuccess}
            />
        </Container>
    );
};

export default TicketsTable;
