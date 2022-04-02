import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Container, CloseButton, Button, Alert } from 'react-bootstrap';

const ProjectForm = (props) => {
    const [projectInfo, setProjectInfo] = useState({});
    const [errors, setErrors] = useState({});
    const [showSuccessSubmission, setShowSuccessSubmission] = useState(false);

    const setField = (field, value) => {
        setProjectInfo({
            ...projectInfo,
            [field]: value,
        });
    };

    const formDataValidation = () => {
        const { name, author } = projectInfo;

        const errors = {};

        if (!name || name == '') {
            errors.name = 'Project name must not be blank.';
        } else if (name.length > 30) {
            errors.name = 'Project name must be less than 30 characters.';
        }

        if (!author || author == '') {
            errors.author = 'Author name must not be blank.';
        } else if (author.length > 30) {
            console.log(author.length);
            errors.author = 'Author name must be less than 30 characters.';
        }

        return errors;
    };

    const handleProjectSubmission = (e) => {
        e.preventDefault();

        const errors = formDataValidation();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            axios
                .post('/api/v1/projects', projectInfo)
                .then((result) => {
                    props.handleProjectPosted();
                    setShowSuccessSubmission(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <Container className="p-5 border">
            <Form onSubmit={(event) => handleProjectSubmission(event)}>
                <CloseButton className="float-end" onClick={() => props.setShowProjectForm(false)} />

                <Form.Group className="mb-4">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your project name"
                        onChange={(e) => setField('name', e.target.value)}
                        isInvalid={errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Brief description for your project"
                        onChange={(e) => setField('description', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the project author name"
                        onChange={(e) => setField('author', e.target.value)}
                        isInvalid={errors.author}
                    />
                    <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                </Form.Group>

                {showSuccessSubmission ? (
                    <Alert variant="success">Success! Your Project information was posted and added to your list!</Alert>
                ) : (
                    <></>
                )}

                <Button variant="success" className="m-1" type="submit">
                    Add Project
                </Button>
                <Button variant="danger" className="m-1" onClick={() => props.setShowProjectForm(false)}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};

export default ProjectForm;
