import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container className="ms-2">
                    <Navbar.Brand href="#">Tricket</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
