import React, { useState } from 'react';
import { Form, Container, CloseButton, Button } from 'react-bootstrap';

const ProjectForm = (props) => {
    const [projectInfo, setProjectInfo] = useState([]);

    const handleProjectSubmission = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let project = {};
        for (let [key, value] of data.entries()) {
            project[key] = value;
        }
        console.log(project);
    };

    return (
        <Container className="p-5 border">
            <Form onSubmit={(event) => handleProjectSubmission(event)}>
                <CloseButton className="float-end" onClick={() => props.setShowProjectForm(false)} />

                <Form.Group className="mb-4">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control id="project" name="project" type="text" placeholder="Enter your project name" />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control id="description" name="description" type="text" placeholder="Brief description for your project" />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Author</Form.Label>
                    <Form.Control id="author" name="author" type="text" placeholder="Enter the project author name" />
                </Form.Group>

                <Button variant="success" className="m-1" type="submit">
                    Add Project
                </Button>
                <Button variant="danger" className="m-1">
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default ProjectForm;
