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
            .get('/projects')
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
                    <Col md="auto">
                        <h3>Project:</h3>
                    </Col>
                    <Col>
                        <Form.Select onChange={(e) => props.setProjectSelected(e.target.value)}>
                            <option>Select your project</option>
                            {projectList.map((project) => {
                                return (
                                    <option key={project.name} value={project.name}>
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
