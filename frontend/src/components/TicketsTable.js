import React, { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import TicketModal from './TicketModal';

const TicketsTable = (props) => {
    const fields = ['id', 'title', 'author', 'status', 'action'];
    const [showModal, setShowModal] = useState(false);
    const [ticket, setTicket] = useState({});

    const handleAction = (ticket) => {
        setTicket(ticket);
        setShowModal(!showModal);
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
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <TicketModal show={showModal} handleClose={handleAction} ticket={ticket} />
        </Container>
    );
};

export default TicketsTable;
