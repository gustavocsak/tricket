import React from 'react';
import { Modal } from 'react-bootstrap';
import TicketForm from './TicketForm.js';

const TicketModal = (props) => {
    const handleTicketEdited = () => {
        console.log('ticket added');
    };
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ticket id: {props.ticket._id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{/* <TicketForm handleTicketSubmission={handleTicketEdited}  */}</Modal.Body>
            </Modal>
        </>
    );
};

export default TicketModal;
