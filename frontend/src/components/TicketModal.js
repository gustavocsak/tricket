import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import TicketForm from './TicketForm.js';

const TicketModal = (props) => {
    const [editSuccess, setEditSuccess] = useState(false);

    const handleTicketEdited = () => {
        setEditSuccess(true);
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
                        <TicketForm
                            handleTicketSubmission={props.handleTicketSubmission}
                            setShowTicketForm={props.setShowTicketForm}
                            errors={props.errors}
                            success={editSuccess}
                            ticketToEdit={props.ticket}
                            method="patch"
                            readOnly={true}
                        />
                    </Modal.Body>
                </Modal>
            ) : (
                <></>
            )}
        </>
    );
};

export default TicketModal;
