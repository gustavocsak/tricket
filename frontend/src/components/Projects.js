import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ProjectSelect from './ProjectSelect';

const Projects = () => {
    return (
        <>
            <Container className="p-5">
                <Row>
                    <Col md="auto">
                        <h3>Project:</h3>
                    </Col>
                    <Col>
                        <ProjectSelect></ProjectSelect>
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
