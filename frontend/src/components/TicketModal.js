import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import TicketForm from './TicketForm.js';

const TicketModal = (props) => {
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
                            handleCloseForm={props.handleClose}
                            handleEditButton={props.handleEditButton}
                            setShowTicketForm={props.setShowTicketForm}
                            errors={props.errors}
                            editSuccess={props.editSuccess}
                            ticketToEdit={props.ticket}
                            method="patch"
                            readOnly={props.readOnly}
                            editing={props.editing}
                            handleConfirmChanges={props.handleConfirmChanges}
                            success={props.success}
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
