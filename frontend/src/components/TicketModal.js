import React from 'react';
import { Modal } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import TicketEdit from './TicketEdit.js';
import TicketForm from './TicketForm.js';

const TicketModal = (props) => {
    const handleTicketEdited = () => {
        console.log('ticket added');
    };

    return (
        <>
            {props.ticket ? (
                <Modal id={props.ticket._id} show={props.show} onHide={props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ticket id: {props.ticket._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TicketEdit handleTicketEdited={handleTicketEdited} ticket={props.ticket} />
                    </Modal.Body>
                </Modal>
            ) : (
                <></>
            )}
        </>
    );
};

export default TicketModal;
