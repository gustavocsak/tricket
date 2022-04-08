import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';

const ProjectModal = (props) => {
    const [projectDeleted, setProjectDeleted] = useState({});

    useEffect(() => {
        if (props.project) {
            axios
                .get(`/api/v1/projects/${props.project}`)
                .then((result) => {
                    setProjectDeleted(result.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    return (
        <Container>
            {console.log('here')}
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.project ? (
                        <p>
                            Are you sure you want to delete this project: <b>{projectDeleted ? projectDeleted.name : ''}</b>
                        </p>
                    ) : (
                        <p>Please select a project to be deleted from the dropdown menu</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {props.project ? (
                        <Container>
                            <Button variant="success" onClick={props.handleDeleteProject}>
                                Confirm
                            </Button>
                            <Button variant="danger" onClick={props.handleCloseModal}>
                                Cancel
                            </Button>
                        </Container>
                    ) : (
                        <Button variant="success" onClick={props.handleCloseModal}>
                            Ok
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProjectModal;
