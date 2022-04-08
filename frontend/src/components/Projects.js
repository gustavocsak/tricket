import React from 'react';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectModal from './ProjectModal';

const Projects = (props) => {
    const [projectList, setProjectList] = useState([]);
    const [projectDeletion, setProjectDeletion] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);

    /**
     * Initial GET request for project dropdown menu
     *
     * Requests will be made on:
     * first render
     * once a new project is posted
     * once a project is deleted
     *
     */
    useEffect(() => {
        axios
            .get('/api/v1/projects')
            .then((result) => {
                setProjectList(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [props.projectPosted, projectDeletion]);

    /**
     * Handles delete project button
     *
     * It'll simply set the project deletion modal to be displayed
     *
     */
    const handleDeleteClick = () => {
        setShowProjectModal(true);
    };

    const handleCloseModal = () => {
        setShowProjectModal(false);
    };

    /**
     * Makes a DELETE request once confirm button on project deletion modal is pressed
     *
     * It'll also trigger a re-render for getting list of projects
     * set the modal to not be displayed
     * and set the project selected to none
     *
     */
    const handleDeleteProject = () => {
        axios
            .delete(`/api/v1/projects/${props.project}`)
            .then((result) => {
                props.setProjectSelected('');
                setProjectDeletion(!projectDeletion);
                setShowProjectModal(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Container className="p-5">
                {console.log('here2')}
                <Row>
                    <Col md="auto mb-2 mb-md-0">
                        <h3>Project:</h3>
                    </Col>
                    <Col className="mb-3 mb-md-0">
                        <Form.Select onChange={(e) => props.setProjectSelected(e.target.value)}>
                            <option value="">Select your project</option>
                            {projectList.map((project) => {
                                return (
                                    <option key={project._id} value={project._id}>
                                        {project.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>

                    <Col md="auto">
                        <Button className="me-3" variant="primary" onClick={() => props.setShowProjectForm(true)}>
                            Add new project
                        </Button>
                        <Button variant="danger" onClick={handleDeleteClick}>
                            Delete project
                        </Button>
                    </Col>
                </Row>

                <ProjectModal
                    handleDeleteProject={handleDeleteProject}
                    setProjectDeletion={setProjectDeletion}
                    projectDeletion={projectDeletion}
                    show={showProjectModal}
                    onHide={handleCloseModal}
                    project={props.project}
                />
            </Container>
        </>
    );
};

export default Projects;
