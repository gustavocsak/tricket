import React from 'react';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectModal from './ProjectModal';

const Projects = (props) => {
    const [projectList, setProjectList] = useState([]);
    const [projectDeletion, setProjectDeletion] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);

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

    const handleDeleteClick = () => {
        setShowProjectModal(true);
    };

    const handleCloseModal = () => {
        setShowProjectModal(false);
    };

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
                        <Button className="me-3 mb-2" variant="primary" onClick={() => props.setShowProjectForm(true)}>
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
