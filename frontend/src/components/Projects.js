import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Projects = (props) => {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        axios
            .get('/project')
            .then((result) => {
                setProjectList(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Container className="p-5">
                <Row>
                    <Col md="auto mb-2 mb-md-0">
                        <h3>Project:</h3>
                    </Col>
                    <Col className="mb-3 mb-md-0">
                        <Form.Select onChange={(e) => props.setProjectSelected(e.target.value)}>
                            <option value="">Select your project</option>
                            {projectList.map((project) => {
                                return (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>

                    <Col md="auto">
                        <Button variant="primary">Add new project</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Projects;
